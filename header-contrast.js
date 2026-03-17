(() => {
  if (window.__ecAdaptiveHeaderContrastInitialized) {
    window.dispatchEvent(new Event('headercontrastrefresh'));
    return;
  }
  window.__ecAdaptiveHeaderContrastInitialized = true;

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.header');
  const brand = header?.querySelector?.('.brand');
  const navActions = header?.querySelector?.('.nav-actions');
  const chips = [brand, navActions].filter(Boolean);

  if (!body || !header || !chips.length) return;

  const mediaCanvas = document.createElement('canvas');
  mediaCanvas.width = 1;
  mediaCanvas.height = 1;
  const mediaContext = mediaCanvas.getContext('2d', { willReadFrequently: true });
  const chipDarkClass = 'header-contrast--dark';
  const rgbPattern = /rgba?\(([^)]+)\)/gi;
  let raf = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const parseColor = (value) => {
    if (!value || value === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };

    const match = value.match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;

    const parts = match[1].split(',').map((part) => part.trim());
    if (parts.length < 3) return null;

    const toChannel = (part) => {
      if (part.endsWith('%')) return clamp(Math.round(parseFloat(part) * 2.55), 0, 255);
      return clamp(Math.round(parseFloat(part)), 0, 255);
    };

    const alphaPart = parts[3];
    const alpha = alphaPart == null
      ? 1
      : alphaPart.endsWith('%')
        ? clamp(parseFloat(alphaPart) / 100, 0, 1)
        : clamp(parseFloat(alphaPart), 0, 1);

    return {
      r: toChannel(parts[0]),
      g: toChannel(parts[1]),
      b: toChannel(parts[2]),
      a: alpha
    };
  };

  const getLuminance = ({ r, g, b }) => {
    const normalize = (channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };

    const [red, green, blue] = [r, g, b].map(normalize);
    return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
  };

  const blendSample = (base, overlay) => {
    if (!overlay) return base;
    if (!base) return overlay;

    const overlayAlpha = clamp(overlay.a, 0, 1);
    const baseAlpha = clamp(base.a, 0, 1);
    const outAlpha = overlayAlpha + (baseAlpha * (1 - overlayAlpha));
    if (outAlpha <= 0) return { r: 255, g: 255, b: 255, a: 0 };

    return {
      r: Math.round(((overlay.r * overlayAlpha) + (base.r * baseAlpha * (1 - overlayAlpha))) / outAlpha),
      g: Math.round(((overlay.g * overlayAlpha) + (base.g * baseAlpha * (1 - overlayAlpha))) / outAlpha),
      b: Math.round(((overlay.b * overlayAlpha) + (base.b * baseAlpha * (1 - overlayAlpha))) / outAlpha),
      a: outAlpha
    };
  };

  const getGradientSample = (backgroundImage, opacity = 1) => {
    if (!backgroundImage || backgroundImage === 'none') return null;

    let match;
    let totalWeight = 0;
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let totalAlpha = 0;

    rgbPattern.lastIndex = 0;
    while ((match = rgbPattern.exec(backgroundImage))) {
      const color = parseColor(match[0]);
      if (!color) continue;
      const weight = clamp(color.a * opacity, 0, 1);
      if (weight <= 0) continue;
      totalWeight += weight;
      totalR += color.r * weight;
      totalG += color.g * weight;
      totalB += color.b * weight;
      totalAlpha += weight;
    }

    if (totalWeight <= 0) return null;
    return {
      r: Math.round(totalR / totalWeight),
      g: Math.round(totalG / totalWeight),
      b: Math.round(totalB / totalWeight),
      a: clamp(totalAlpha / Math.max(1, Math.ceil(totalWeight)), 0, 1)
    };
  };

  const parsePositionToken = (token, freeSpace) => {
    if (!token) return freeSpace / 2;

    switch (token) {
      case 'left':
      case 'top':
        return 0;
      case 'center':
        return freeSpace / 2;
      case 'right':
      case 'bottom':
        return freeSpace;
      default:
        if (token.endsWith('%')) return freeSpace * (parseFloat(token) / 100);
        if (token.endsWith('px')) return parseFloat(token);
        return parseFloat(token) || 0;
    }
  };

  const getExplicitContrast = (element) => {
    const contrastRoot = element?.closest?.('[data-header-contrast]');
    const mode = contrastRoot?.getAttribute?.('data-header-contrast');
    if (mode === 'dark' || mode === 'light') return mode;
    return null;
  };

  const getStyleSample = (element) => {
    if (!(element instanceof Element)) return null;

    const style = window.getComputedStyle(element);
    const opacity = clamp(parseFloat(style.opacity || '1') || 1, 0, 1);

    const gradientSample = getGradientSample(style.backgroundImage, opacity);
    if (gradientSample) return gradientSample;

    const backgroundColor = parseColor(style.backgroundColor);
    if (backgroundColor && (backgroundColor.a * opacity) > 0.04) {
      return {
        r: backgroundColor.r,
        g: backgroundColor.g,
        b: backgroundColor.b,
        a: clamp(backgroundColor.a * opacity, 0, 1)
      };
    }

    return null;
  };

  const getMediaSourcePoint = (media, x, y) => {
    const rect = media.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    const naturalWidth = media instanceof HTMLVideoElement
      ? media.videoWidth
      : media instanceof HTMLCanvasElement
        ? media.width
        : media.naturalWidth;
    const naturalHeight = media instanceof HTMLVideoElement
      ? media.videoHeight
      : media instanceof HTMLCanvasElement
        ? media.height
        : media.naturalHeight;

    if (!naturalWidth || !naturalHeight) return null;

    const style = window.getComputedStyle(media);
    const fit = style.objectFit || 'fill';
    const positionTokens = (style.objectPosition || '50% 50%').split(/\s+/).filter(Boolean);
    const positionX = positionTokens[0] || '50%';
    const positionY = positionTokens[1] || positionTokens[0] || '50%';

    if (fit === 'fill') {
      return {
        sx: clamp(((x - rect.left) / rect.width) * naturalWidth, 0, naturalWidth - 1),
        sy: clamp(((y - rect.top) / rect.height) * naturalHeight, 0, naturalHeight - 1)
      };
    }

    let renderedWidth = naturalWidth;
    let renderedHeight = naturalHeight;

    if (fit === 'none') {
      renderedWidth = naturalWidth;
      renderedHeight = naturalHeight;
    } else {
      const containScale = Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
      const coverScale = Math.max(rect.width / naturalWidth, rect.height / naturalHeight);
      const scale = fit === 'contain'
        ? containScale
        : fit === 'scale-down'
          ? Math.min(1, containScale)
          : coverScale;

      renderedWidth = naturalWidth * scale;
      renderedHeight = naturalHeight * scale;
    }

    const offsetX = parsePositionToken(positionX, rect.width - renderedWidth);
    const offsetY = parsePositionToken(positionY, rect.height - renderedHeight);
    const localX = x - rect.left - offsetX;
    const localY = y - rect.top - offsetY;

    if (localX < 0 || localY < 0 || localX > renderedWidth || localY > renderedHeight) {
      return null;
    }

    return {
      sx: clamp((localX / renderedWidth) * naturalWidth, 0, naturalWidth - 1),
      sy: clamp((localY / renderedHeight) * naturalHeight, 0, naturalHeight - 1)
    };
  };

  const getMediaSample = (element, x, y) => {
    if (!mediaContext) return null;
    if (!(element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLCanvasElement)) {
      return null;
    }

    if (element instanceof HTMLImageElement && !element.complete) return null;
    if (element instanceof HTMLVideoElement && element.readyState < 2) return null;

    const sourcePoint = getMediaSourcePoint(element, x, y);
    if (!sourcePoint) return null;

    try {
      mediaContext.clearRect(0, 0, 1, 1);
      mediaContext.drawImage(element, sourcePoint.sx, sourcePoint.sy, 1, 1, 0, 0, 1, 1);
      const pixel = mediaContext.getImageData(0, 0, 1, 1).data;
      if (!pixel || pixel[3] === 0) return null;
      return {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        a: pixel[3] / 255
      };
    } catch {
      return null;
    }
  };

  const getFallbackSample = () => {
    return getStyleSample(body) || getStyleSample(root) || { r: 255, g: 255, b: 255, a: 1 };
  };

  const getBrightnessAtPoint = (x, y) => {
    const stack = typeof document.elementsFromPoint === 'function'
      ? document.elementsFromPoint(x, y)
      : [document.elementFromPoint(x, y)].filter(Boolean);

    const layerSamples = [];

    for (const element of stack) {
      if (!(element instanceof Element)) continue;
      if (element === header || header.contains(element)) continue;

      const explicitContrast = getExplicitContrast(element);
      if (explicitContrast === 'dark') return 0;
      if (explicitContrast === 'light') return 1;

      const mediaSample = getMediaSample(element, x, y);
      if (mediaSample) layerSamples.push(mediaSample);

      const styleSample = getStyleSample(element);
      if (styleSample) layerSamples.push(styleSample);
    }

    const compositeSample = layerSamples
      .reverse()
      .reduce((current, sample) => blendSample(current, sample), getFallbackSample());

    return getLuminance(compositeSample);
  };

  const getChipBrightness = (chip) => {
    const rect = chip.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    const insetX = Math.min(10, rect.width * 0.12);
    const insetY = Math.min(8, rect.height * 0.2);
    const left = rect.left + insetX;
    const right = rect.right - insetX;
    const top = rect.top + insetY;
    const bottom = rect.bottom - insetY;
    const centerX = rect.left + (rect.width / 2);
    const centerY = rect.top + (rect.height / 2);

    const samplePoints = [
      [left, centerY],
      [centerX, centerY],
      [right, centerY],
      [centerX, top],
      [centerX, bottom]
    ];

    const values = samplePoints
      .map(([sampleX, sampleY]) => getBrightnessAtPoint(
        clamp(Math.round(sampleX), 0, Math.max(0, window.innerWidth - 1)),
        clamp(Math.round(sampleY), 0, Math.max(0, window.innerHeight - 1))
      ))
      .filter((value) => typeof value === 'number' && !Number.isNaN(value));

    if (!values.length) return null;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const updateChipContrast = (chip) => {
    const brightness = getChipBrightness(chip);
    if (brightness == null) {
      chip.classList.remove(chipDarkClass);
      return;
    }

    const isDark = chip.classList.contains(chipDarkClass);
    const nextIsDark = isDark ? brightness < 0.52 : brightness < 0.44;
    chip.classList.toggle(chipDarkClass, nextIsDark);
  };

  const updateHeaderContrast = () => {
    raf = 0;

    if (root.classList.contains('dark-mode')) {
      chips.forEach((chip) => chip.classList.remove(chipDarkClass));
      return;
    }

    if (body.classList.contains('site-menu-open')) {
      chips.forEach((chip) => chip.classList.add(chipDarkClass));
      return;
    }

    chips.forEach(updateChipContrast);
  };

  const scheduleHeaderContrast = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(updateHeaderContrast);
  };

  window.refreshAdaptiveHeaderContrast = scheduleHeaderContrast;

  window.addEventListener('scroll', scheduleHeaderContrast, { passive: true });
  window.addEventListener('resize', scheduleHeaderContrast, { passive: true });
  window.addEventListener('load', scheduleHeaderContrast, { passive: true });
  window.addEventListener('pageshow', scheduleHeaderContrast, { passive: true });
  window.addEventListener('headercontrastrefresh', scheduleHeaderContrast);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) scheduleHeaderContrast();
  });
  document.addEventListener('load', scheduleHeaderContrast, true);
  document.addEventListener('loadeddata', scheduleHeaderContrast, true);

  scheduleHeaderContrast();
})();
