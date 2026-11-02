/* Enable only after Tech Provider approval AND permission to use the supplied asset.
 * Replace asset with the official, approved local SVG/image; never use a third-party badge.
 */
(() => {
  const techProvider = { approved: false, asset: '' };
  if (!techProvider.approved || !techProvider.asset) return;
  for (const slot of document.querySelectorAll('[data-meta-tech-provider-slot]')) {
    const image = document.createElement('img');
    image.src = techProvider.asset;
    image.alt = 'Meta Tech Provider';
    image.width = 112;
    image.height = 36;
    slot.appendChild(image);
    slot.hidden = false;
  }
})();
