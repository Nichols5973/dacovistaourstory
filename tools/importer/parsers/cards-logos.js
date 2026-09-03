/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-logos. Base block: cards.
 * Source: https://www.covista.com/ (home template)
 * Generated: 2026-09-03
 *
 * Block structure (from library-description.txt — "Cards"):
 *   - 2 columns, multiple rows; first row is the block name.
 *   - Each subsequent row is one card: col1 = image/icon (mandatory),
 *     col2 = text content (optional title/description/CTA).
 *
 * Source structure (verified against cleaned.html):
 *   - This section renders a row of institution logos. Each logo is a
 *     `.c-image` (or `.c-cv-image`) block containing a `<picture>`/`<img>`,
 *     and each logo is wrapped in an anchor linking to the institution site.
 *   - There is no per-logo title/description text — logos are image-only,
 *     so the text column is left empty (padded) to keep a valid 2-col table.
 *
 * Strategy: collect each logo image block, use the surrounding anchor's href
 * (if any) as an optional CTA/label, and emit one row per logo with the image
 * in col1. Falls back to any `img`/`picture` if `.c-image` blocks are absent.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Primary path: one row per logo image block.
  let logos = Array.from(element.querySelectorAll('.c-image, .c-cv-image'));
  // Keep only outermost image blocks (avoid nested duplicates).
  logos = logos.filter((n, _i, all) => !all.some((o) => o !== n && o.contains(n)));

  if (logos.length) {
    logos.forEach((logo) => {
      const media = logo.querySelector('picture, img');
      if (!media) return;

      // Optional: the institution link wrapping the logo → keep as CTA text.
      const anchor = logo.closest('a[href]');
      const contentCell = [];
      if (anchor && anchor.getAttribute('href')) {
        const img = media.querySelector ? media.querySelector('img') : null;
        const label = (media.tagName === 'IMG' ? media.getAttribute('alt') : (img && img.getAttribute('alt'))) || '';
        if (label.trim()) {
          const link = document.createElement('a');
          link.setAttribute('href', anchor.getAttribute('href'));
          link.textContent = label.trim();
          contentCell.push(link);
        }
      }

      cells.push([media, contentCell.length ? contentCell : '']);
    });
  }

  // Fallback: raw images if no .c-image blocks were found.
  if (!cells.length) {
    let media = Array.from(element.querySelectorAll('picture'));
    if (!media.length) media = Array.from(element.querySelectorAll('img'));
    media = media.filter((n, _i, all) => !all.some((o) => o !== n && o.contains(n)));
    media.forEach((m) => cells.push([m, '']));
  }

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-logos', cells });
  element.replaceWith(block);
}
