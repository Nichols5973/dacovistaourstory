/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base block: hero.
 * Source: https://www.covista.com/our-story
 * Generated: 2026-09-03
 *
 * Block structure (from library-description.txt):
 *   - 1 column, up to 3 rows; first row is block name.
 *   - Row 2 (single cell): background image (optional).
 *   - Row 3 (single cell): title (heading), subheading text, optional CTA.
 *
 * Source structure:
 *   - Background image in `.p-banner__media picture`/`img`.
 *   - Heading in `.p-banner-heading` (h1).
 *   - Copy/subheading in `.p-banner-copy` (paragraphs).
 *   - CTA links, if any, inside the content wrapper.
 */
export default function parse(element, { document }) {
  // Background image (row 2).
  const mediaScope = element.querySelector(
    '.p-banner__media, .p-cv-banner__media, [class*="banner__media"]',
  );
  let bgImage = null;
  if (mediaScope) {
    bgImage = mediaScope.querySelector('picture') || mediaScope.querySelector('img');
  }
  if (!bgImage) {
    bgImage = element.querySelector('picture') || element.querySelector('img');
  }

  // Content (row 3).
  const heading = element.querySelector(
    '.p-banner-heading, [class*="banner--heading"], h1, h2',
  );
  const copyWrap = element.querySelector(
    '.p-banner-copy, [class*="banner-copy"], [class*="banner--copy"]',
  );
  const copyNodes = copyWrap
    ? Array.from(copyWrap.querySelectorAll(':scope > *')).filter((n) => n.textContent.trim())
    : [];
  const ctaLinks = Array.from(
    element.querySelectorAll('.p-banner__content a[href], [class*="banner__content"] a[href]'),
  );

  // Empty-block guard.
  if (!heading && !copyNodes.length && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (optional).
  if (bgImage) cells.push([bgImage]);

  // Row 3: content (single cell holding heading, copy, CTAs).
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (copyNodes.length) contentCell.push(...copyNodes);
  else if (copyWrap) contentCell.push(copyWrap);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
