(() => {
  const html = document.documentElement;
  const body = document.body;
  const loader = document.querySelector('[data-site-loader]');
  if (!html || !body || !loader) return;

  const config = window.__siteLoaderConfig || {};
  const labelEl = loader.querySelector('[data-site-loader-label]');
  const minDuration = Math.max(0, Number(config.minDuration) || 700);
  const maxDuration = Math.max(minDuration + 600, Number(config.maxDuration) || 4800);
  const checks = Array.isArray(config.checks)
    ? config.checks.filter((check) => typeof check === 'function')
    : [];

  if (typeof config.label === 'string' && labelEl) {
    labelEl.textContent = config.label;
  }

  const startTime = typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();

  let isDone = false;
  body.setAttribute('aria-busy', 'true');

  const getNow = () => (typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now());

  const domReady = document.readyState === 'loading'
    ? new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve, { once: true }))
    : Promise.resolve();

  const fontsReady = document.fonts?.ready
    ? document.fonts.ready.catch(() => {})
    : Promise.resolve();

  const waitForChecks = () => new Promise((resolve) => {
    if (!checks.length) {
      resolve(true);
      return;
    }

    const deadline = getNow() + maxDuration;
    const poll = () => {
      const ready = checks.every((check) => {
        try {
          return !!check();
        } catch (error) {
          return false;
        }
      });

      if (ready || getNow() >= deadline) {
        resolve(ready);
        return;
      }

      window.setTimeout(poll, 80);
    };

    poll();
  });

  const finish = () => {
    if (isDone) return;
    isDone = true;
    loader.classList.add('is-hiding');
    body.classList.remove('is-page-loading');
    body.classList.add('is-page-ready');
    body.setAttribute('aria-busy', 'false');

    window.setTimeout(() => {
      loader.setAttribute('aria-hidden', 'true');
      loader.remove();
    }, 420);
  };

  const maxWait = new Promise((resolve) => window.setTimeout(resolve, maxDuration));

  Promise.race([
    Promise.all([domReady, fontsReady, waitForChecks()]),
    maxWait
  ]).then(() => {
    const elapsed = getNow() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);
    window.setTimeout(finish, remaining);
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) finish();
  }, { once: true });
})();