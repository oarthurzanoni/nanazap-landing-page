/* Analytics are optional; no vendor script loads until an explicit choice. */
(() => {
  const key = 'nanazap-cookie-preference-v2';
  const banner = document.getElementById('cookie-choice');
  const preferences = document.getElementById('cookie-preferences');
  if (!banner || !preferences) return;
  let loaded = false;
  function script(src, attributes = {}) {
    const element = document.createElement('script');
    element.async = true;
    element.src = src;
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    document.head.appendChild(element);
  }
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-G-R84BQBB08P'] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-R84BQBB08P');
    script('https://www.googletagmanager.com/gtag/js?id=G-R84BQBB08P');
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    script('https://www.clarity.ms/tag/x3xtomusbb');
    script('https://cdn.usefathom.com/script.js', { 'data-site': 'MUFXZSUX' });
  }
  function clearAnalyticsCookies() {
    const parts = location.hostname.split('.');
    const domains = ['', location.hostname];
    for (let i = 0; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_clck$|_clsk$)/.test(name)) continue;
      for (const domain of domains) document.cookie = name + '=; Max-Age=0; Path=/' + (domain ? '; Domain=' + domain : '');
    }
  }
  function choose(value) {
    try { localStorage.setItem(key, value); } catch { /* Choice remains valid for this page. */ }
    banner.hidden = true;
    if (value === 'analytics') loadAnalytics();
    else {
      window['ga-disable-G-R84BQBB08P'] = true;
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
      if (typeof window.clarity === 'function') window.clarity('consent', false);
      clearAnalyticsCookies();
      if (loaded) location.reload();
    }
    preferences.focus({ preventScroll: true });
  }
  let preference;
  try { preference = localStorage.getItem(key); } catch { /* Ask without requiring storage. */ }
  if (preference === 'analytics') loadAnalytics();
  else if (preference !== 'essential') banner.hidden = false;
  document.getElementById('cookie-essential').addEventListener('click', () => choose('essential'));
  document.getElementById('cookie-analytics').addEventListener('click', () => choose('analytics'));
  preferences.addEventListener('click', () => {
    banner.hidden = false;
    document.getElementById('cookie-essential').focus({ preventScroll: true });
  });
})();
