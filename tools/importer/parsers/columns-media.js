/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-media. Base block: columns.
 * Source: https://www.covista.com/our-story
 * Generated: 2026-09-03
 *
 * Block structure (from library-description.txt):
 *   - Flexible columns/rows; first row is block name.
 *   - Number of columns follows the natural visual grouping of the source content.
 *
 * Source structure:
 *   - Multi-column layouts expose one `.layout__region` per column
 *     (e.g. `layout__region--sidebar` + `layout__region--main`).
 *   - One-column layouts may expose a single region or none.
 *   - Column content is text (h2/h3/p), media (picture/img/video), and CTA links,
 *     wrapped in deep Drupal/richtext/universal-grid containers.
 *
 * Strategy: treat each `.layout__region` as one column, collecting its meaningful
 * content nodes so wrapper/animation divs are dropped. Falls back to a single
 * column built from the whole element when no regions are present.
 */
const CONTENT_SELECTOR = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p',
  'ul', 'ol',
  'blockquote',
  'picture',
  'img:not(picture img)',
  'video',
  'iframe',
  'a[href][class*="btn"]:not(p a)',
  'a[href][class*="button"]:not(p a)',
].join(', ');

function collectContent(scope) {
  const nodes = Array.from(scope.querySelectorAll(CONTENT_SELECTOR)).filter((n) => {
    if (n.matches('picture, img, video, iframe')) return true;
    return n.textContent.trim().length > 0;
  });
  // Drop nodes nested inside another collected node to avoid duplication
  // (e.g. an <img> already inside a collected <picture>).
  const top = nodes.filter((n) => !nodes.some((other) => other !== n && other.contains(n)));
  return top;
}

export default function parse(element, { document }) {
  const regions = Array.from(element.querySelectorAll('.layout__region, .grid__container--item'))
    // Keep only outermost regions (not nested duplicates).
    .filter((r, _i, all) => !all.some((other) => other !== r && other.contains(r)));

  const columnCells = [];

  if (regions.length) {
    regions.forEach((region) => {
      const content = collectContent(region);
      if (content.length) columnCells.push(content);
    });
  }

  // Fallback: no region split (one-column layout) — one cell with all content.
  if (!columnCells.length) {
    const content = collectContent(element);
    if (content.length) columnCells.push(content);
  }

  // Empty-block guard.
  if (!columnCells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [columnCells];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-media', cells });
  element.replaceWith(block);
}
