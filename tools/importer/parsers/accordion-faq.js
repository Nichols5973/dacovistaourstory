/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base block: accordion.
 * Source: https://www.covista.com/our-story
 * Generated: 2026-09-03
 *
 * Block structure (from library-description.txt):
 *   - 2 columns, multiple rows; first row is block name.
 *   - Each subsequent row is one accordion item: [title cell, content cell].
 *
 * Source structure:
 *   - Items live in `.p-accordion__item` (some may be empty placeholders).
 *   - Title in `.p-accordion__item--heading` (an <h3>).
 *   - Body in `.p-accordion__item--body` (one or more <p>).
 */
export default function parse(element, { document }) {
  const items = Array.from(
    element.querySelectorAll('.p-accordion__item, .p-cv-accordion__item'),
  );

  const cells = [];

  items.forEach((item) => {
    const headingWrap = item.querySelector(
      '.p-accordion__item--heading, .p-cv-accordion__item--heading',
    );
    const bodyWrap = item.querySelector(
      '.p-accordion__item--body, .p-cv-accordion__item--body',
    );

    // Title: prefer a heading element with actual text, otherwise the wrapper text.
    let titleCell = null;
    if (headingWrap) {
      const headings = Array.from(headingWrap.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter((h) => h.textContent.trim());
      if (headings.length) {
        titleCell = headings[0];
      } else if (headingWrap.textContent.trim()) {
        titleCell = headingWrap;
      }
    }

    // Content: all body content nodes.
    let contentCell = null;
    if (bodyWrap && bodyWrap.textContent.trim()) {
      const bodyNodes = Array.from(bodyWrap.querySelectorAll(':scope > *'))
        .filter((n) => n.textContent.trim() || n.querySelector('img'));
      contentCell = bodyNodes.length ? bodyNodes : bodyWrap;
    }

    // Only emit a row for items that have a real title (skip empty placeholders).
    if (titleCell) {
      cells.push([titleCell, contentCell || '']);
    }
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
