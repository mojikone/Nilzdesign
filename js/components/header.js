export function initHeader() {
  const currentSlug = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');

  const pages = [
    { href: 'index.html',    label: 'Home' },
    { href: 'projects.html', label: 'Work' },
    { href: 'about.html',    label: 'About' },
    { href: 'contact.html',  label: 'Contact' },
  ];

  const navLinks = pages.map(p => {
    const slug   = p.href.replace(/\.html$/, '');
    const active = currentSlug === slug ? 'class="active"' : '';
    return `<li><a href="${p.href}" ${active}>${p.label}</a></li>`;
  }).join('');

  const html = `
<header id="site-header">
  <div class="header-inner container">
    <a href="index.html" class="header-logo header-logo--monogram">
      <span class="header-monogram">NZ</span>
    </a>
    <nav class="header-nav" id="header-nav">
      <ul>${navLinks}</ul>
    </nav>
    <a href="cv.html" target="_blank" class="btn btn--gold header-cta">Download CV</a>
    <button class="header-burger" id="header-burger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  // Scroll: add .scrolled class when past 60px
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Burger toggle
  const burger = document.getElementById('header-burger');
  const nav    = document.getElementById('header-nav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('open');
  });
}
