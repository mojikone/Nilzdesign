export function initAnimatedText(selector, options = {}) {
  const {
    animationType  = 'letters',
    duration       = 0.6,
    delay          = 0,
    staggerDelay   = 0.05,
    initialY       = 10,
  } = options;

  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) return;

  const rawHTML = el.innerHTML;
  const lines   = rawHTML.split(/<br\s*\/?>/i);

  el.classList.remove('fade-up', 'delay-1', 'delay-2', 'delay-3');
  el.style.opacity = '1';
  el.innerHTML = '';

  let globalIndex = 0;

  lines.forEach((lineText, lineIndex) => {
    const lineEl = document.createElement('span');
    lineEl.style.display = 'block';

    const units = animationType === 'letters' ? lineText.split('') : lineText.split(' ');

    units.forEach((unit, unitIndex) => {
      if (animationType === 'words' && unitIndex > 0) {
        lineEl.appendChild(document.createTextNode(' '));
      }

      const span = document.createElement('span');
      span.className = 'anim-char';
      span.textContent = unit === ' ' ? ' ' : unit;

      const t = delay + globalIndex * staggerDelay;
      span.style.cssText = `
        display: inline-block;
        opacity: 0;
        transform: translateY(${initialY}px);
        transition: opacity ${duration}s ease-out ${t}s,
                    transform ${duration}s ease-out ${t}s;
      `;

      lineEl.appendChild(span);
      globalIndex++;
    });

    el.appendChild(lineEl);
  });

  const spans = () => el.querySelectorAll('.anim-char');

  function animateIn(delayOffset = 0) {
    spans().forEach((span, i) => {
      const t = delayOffset + i * staggerDelay;
      span.style.transition = `opacity ${duration}s ease-out ${t}s, transform ${duration}s ease-out ${t}s`;
      span.style.opacity    = '1';
      span.style.transform  = 'translateY(0)';
    });
  }

  function reset() {
    spans().forEach(span => {
      span.style.transition = 'none';
      span.style.opacity    = '0';
      span.style.transform  = `translateY(${initialY}px)`;
    });
  }

  // Initial load animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => animateIn(delay));
  });

  // Hover: replay on mouseenter
  el.style.cursor = 'default';
  el.addEventListener('mouseenter', () => {
    reset();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => animateIn(0));
    });
  });
}
