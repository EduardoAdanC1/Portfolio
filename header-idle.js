(() => {
  if (window.__ecAdaptiveHeaderIdleInitialized) return;
  window.__ecAdaptiveHeaderIdleInitialized = true;

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.header');
  const supportsFinePointer = window.matchMedia?.('(pointer: fine)')?.matches && window.matchMedia?.('(hover: hover)')?.matches;
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  if (!body || !header || !supportsFinePointer || prefersReducedMotion) return;

  const IDLE_CLASS = 'header-idle';
  const HIDDEN_CLASS = 'header-idle-hidden';
  const IDLE_DELAY = 1500;
  const HIDE_DELAY = 4200;

  let idleTimer = 0;
  let hideTimer = 0;
  let pointerInsideHeader = false;
  let lastPointerX = null;
  let lastPointerY = null;
  let lastMenuOpenState = body.classList.contains('site-menu-open');

  const clearTimers = () => {
    if (idleTimer) {
      window.clearTimeout(idleTimer);
      idleTimer = 0;
    }
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = 0;
    }
  };

  const clearIdleState = () => {
    body.classList.remove(IDLE_CLASS, HIDDEN_CLASS);
  };

  const shouldSuspendIdle = () => {
    if (document.hidden) return true;
    if (body.classList.contains('site-menu-open')) return true;
    if (pointerInsideHeader) return true;
    if (header.contains(document.activeElement)) return true;
    return false;
  };

  const armIdleTimers = () => {
    clearTimers();
    if (shouldSuspendIdle()) {
      clearIdleState();
      return;
    }

    idleTimer = window.setTimeout(() => {
      if (shouldSuspendIdle()) return;
      body.classList.add(IDLE_CLASS);
    }, IDLE_DELAY);

    hideTimer = window.setTimeout(() => {
      if (shouldSuspendIdle()) return;
      body.classList.add(IDLE_CLASS, HIDDEN_CLASS);
    }, HIDE_DELAY);
  };

  const revealHeader = ({ rearm = true } = {}) => {
    clearIdleState();
    clearTimers();
    if (rearm) armIdleTimers();
  };

  const handlePointerActivity = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;

    const currentX = typeof event.clientX === 'number' ? event.clientX : null;
    const currentY = typeof event.clientY === 'number' ? event.clientY : null;
    const movedEnough =
      lastPointerX == null ||
      lastPointerY == null ||
      currentX == null ||
      currentY == null ||
      Math.abs(currentX - lastPointerX) > 1 ||
      Math.abs(currentY - lastPointerY) > 1;

    lastPointerX = currentX;
    lastPointerY = currentY;

    if (!movedEnough) return;
    revealHeader();
  };

  header.addEventListener('mouseenter', () => {
    pointerInsideHeader = true;
    revealHeader({ rearm: false });
  });

  header.addEventListener('mouseleave', () => {
    pointerInsideHeader = false;
    armIdleTimers();
  });

  window.addEventListener('pointermove', handlePointerActivity, { passive: true });
  window.addEventListener('scroll', () => revealHeader(), { passive: true });
  window.addEventListener('wheel', () => revealHeader(), { passive: true });
  window.addEventListener('pointerdown', () => revealHeader(), { passive: true });
  window.addEventListener('keydown', () => revealHeader(), { passive: true });
  window.addEventListener('focus', () => revealHeader(), { passive: true });

  document.addEventListener('focusin', () => revealHeader(), true);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimers();
      clearIdleState();
      return;
    }
    revealHeader();
  });

  const bodyObserver = new MutationObserver(() => {
    const menuOpen = body.classList.contains('site-menu-open');
    if (menuOpen === lastMenuOpenState) return;
    lastMenuOpenState = menuOpen;

    if (menuOpen) {
      clearTimers();
      clearIdleState();
      return;
    }
    armIdleTimers();
  });
  bodyObserver.observe(body, { attributes: true, attributeFilter: ['class'] });

  armIdleTimers();
})();
