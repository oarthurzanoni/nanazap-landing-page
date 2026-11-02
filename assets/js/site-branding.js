/* Enable only after Tech Provider approval AND permission to use the supplied asset.
 * The supplied third-party image is for localhost preview only.
 * Before enabling approved, replace it with an authorized production asset.
 */
(() => {
  const techProvider = { approved: false, asset: './assets/images/meta-tech-provider-preview.png' };
  // Explicit localhost-only visual preview; production remains hidden.
  const localPreview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) && new URLSearchParams(location.search).get('badge-preview') === '1';
  if ((!techProvider.approved && !localPreview) || !techProvider.asset) return;
  document.documentElement.classList.add('has-tech-provider-badge');
  for (const slot of document.querySelectorAll('[data-meta-tech-provider-slot]')) {
    const image = document.createElement('img');
    image.src = techProvider.asset;
    image.alt = 'Meta Tech Provider';
    image.width = 136;
    image.height = 36;
    slot.appendChild(image);
    slot.hidden = false;
  }
})();
