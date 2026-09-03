/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-stats. Base block: cards.
 * Source: https://www.covista.com/our-story (home template)
 * Generated: 2026-09-03
 *
 * Block structure (from library-description.txt — "Cards"):
 *   - 2 columns, multiple rows; first row is the block name.
 *   - Each subsequent row is one card: col1 = image/icon (mandatory),
 *     col2 = text content (title/heading, description, optional CTA).
 *
 * Source structure (verified against cleaned.html):
 *   - This section renders 3 stat callouts inside a universal-grid, one per
 *     `.c-universal-grid__item`. Each item contains:
 *       - an icon (`.c-icon` with an inline-svg `img`, or an icon-font
 *         `span[class*="icon-"]` / `.e-icon-svg`),
 *       - a large stat number in `.e-stat` (e.g. "5", "26K", "300K+"),
 *       - a label in `.e-stat-copy` (e.g. "post-secondary institutions").
 *   - Fallback: if the passed element is instead a generic `.c-card__item`
 *     (image + heading + copy + CTA), it is handled as a single card row.
 *
 * Strategy: iterate stat callouts, mapping icon -> col1 and number+label
 * -> col2. The stat number is promoted to a heading so it renders as the
 * card title. Falls back to single-card extraction when no stat items exist.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Primary path: stat callouts.
  let statItems = Array.from(element.querySelectorAll('.c-universal-grid__item'));
  // Keep only items that actually contain a stat number.
  statItems = statItems.filter((it) => it.querySelector('.e-stat'));
  // If the element itself is a single stat item (no wrapper matched), use it.
  if (!statItems.length && element.querySelector('.e-stat')) {
    statItems = [element];
  }

  if (statItems.length) {
    statItems.forEach((item) => {
      // Icon: prefer a real <img>/<picture>, else the icon-font span.
      const iconImg = item.querySelector('.c-icon img, .c-image img, picture');
      const iconSpan = item.querySelector('.e-icon-svg, span[class*="icon-"]');
      const iconCell = iconImg || iconSpan || '';

      // Number -> promoted to a heading so it reads as the card title.
      const statEl = item.querySelector('.e-stat');
      const labelEl = item.querySelector('.e-stat-copy');

      const contentCell = [];
      if (statEl) {
        const numText = statEl.textContent.trim();
        if (numText) {
          const h = document.createElement('h3');
          h.textContent = numText;
          contentCell.push(h);
        }
      }
      if (labelEl) {
        const labelText = labelEl.textContent.trim();
        if (labelText) {
          const p = document.createElement('p');
          p.textContent = labelText;
          contentCell.push(p);
        }
      }

      // Only emit a row if there is meaningful content.
      if (iconCell || contentCell.length) {
        cells.push([iconCell, contentCell.length ? contentCell : '']);
      }
    });
  } else {
    // Fallback: treat as generic card items (image + text + CTA).
    let cardItems = Array.from(element.querySelectorAll('.c-card__item, .c-cv-card__item'));
    if (!cardItems.length) cardItems = [element];
    cardItems.forEach((item) => {
      const media = item.querySelector('.c-card__item--media picture, .c-card__item--media img, picture, img');
      const heading = item.querySelector('h1, h2, h3, h4');
      const paras = Array.from(item.querySelectorAll('.c-card__item--copy p, .c-card__item--content p'));
      const cta = item.querySelector('.c-card__item--cta a[href], a[class*="btn"], a[class*="button"]');

      const contentCell = [];
      if (heading) contentCell.push(heading);
      paras.forEach((p) => { if (p.textContent.trim()) contentCell.push(p); });
      if (cta) contentCell.push(cta);

      if (media || contentCell.length) {
        cells.push([media || '', contentCell.length ? contentCell : '']);
      }
    });
  }

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
