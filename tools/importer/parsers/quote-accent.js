/* eslint-disable */
/* global WebImporter */
/**
 * Parser for quote-accent. Base block: quote (no library convention available —
 * structure inferred from source HTML).
 * Source: https://www.covista.com/our-story
 * Generated: 2026-09-03
 *
 * Source structure (testimonial carousel slide):
 *   - Portrait image in `.p-carousel__media picture`/`img` (a base64 SVG overlay
 *     image is also present and must be excluded).
 *   - Quote text in `.e-quote` (a span).
 *   - Attribution (name + role) in the following `<p>` within
 *     `.p-carousel__content--subheading`.
 *
 * Inferred block layout: 1 column.
 *   - Row 2: portrait image (optional).
 *   - Row 3: quote text + attribution.
 */
export default function parse(element, { document }) {
  // Use the first (current/active) slide when multiple carousel items exist.
  const slide = element.querySelector('.c-carousel__item, .c-cv-carousel__item') || element;

  // Portrait image — exclude the decorative base64 SVG overlay.
  const mediaScope = slide.querySelector('[class*="carousel__media"], [class*="carousel__-media"]')
    || slide;
  let image = mediaScope.querySelector('picture');
  if (image) {
    // If the picture only wraps the data-URI overlay, fall back to a real img.
    const realImg = Array.from(mediaScope.querySelectorAll('img'))
      .find((img) => img.getAttribute('src') && !img.getAttribute('src').startsWith('data:'));
    if (realImg && !image.contains(realImg)) image = realImg;
  } else {
    image = Array.from(mediaScope.querySelectorAll('img'))
      .find((img) => img.getAttribute('src') && !img.getAttribute('src').startsWith('data:'));
  }

  // Quote text.
  const quote = slide.querySelector('.e-quote, [class*="quote"]');

  // Attribution (name / role): the paragraph within the subheading block.
  // Fall back to the first non-empty <p> that sits alongside the quote (its
  // parent/subheading container) so slightly different DOM shapes still resolve it.
  let attribution = slide.querySelector(
    '[class*="content--subheading"] p, [class*="content-headings"] p',
  );
  if (!attribution && quote) {
    const subheading = quote.closest('[class*="subheading"], [class*="content-headings"]')
      || (quote.parentElement && quote.parentElement.parentElement);
    if (subheading) {
      attribution = Array.from(subheading.querySelectorAll('p'))
        .find((p) => p.textContent.trim() && !p.closest('.e-quote'));
    }
  }

  // Empty-block guard.
  if (!quote && !attribution && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: portrait image (optional).
  if (image) cells.push([image]);

  // Row 3: quote + attribution in a single cell.
  const contentCell = [];
  if (quote) contentCell.push(quote);
  if (attribution) contentCell.push(attribution);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'quote-accent', cells });
  element.replaceWith(block);
}
