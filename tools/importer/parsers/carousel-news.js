/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-news. Base block: carousel.
 * Source: https://www.covista.com/ (home template)
 * Generated: 2026-09-03
 *
 * Block structure (from library-description.txt — "Carousel"):
 *   - 2 columns, multiple rows; first row is the block name.
 *   - Each subsequent row is one slide: col1 = image (mandatory, no other
 *     content), col2 = optional text (title/heading, description, CTA).
 *
 * Source structure (verified against cleaned.html):
 *   - A Slick slider (`.slick-slider` / `.slick-track`) with slides in
 *     `.views-row.slick-slide`. Slick DUPLICATES slides for infinite looping;
 *     the duplicates carry the `.slick-cloned` class. On this page there are
 *     15 slide nodes but only 6 unique real slides.
 *   - Each real slide contains:
 *       - an image (`.image--container` → `picture`/`img`),
 *       - tags (`.view-tag-field` — taxonomy links),
 *       - a title with a link to the article (`.view-title-field` → `a`).
 *
 * Strategy: collect `.slick-slide`, drop `.slick-cloned` duplicates, then
 * dedupe defensively by the title link href (in case cloning markers vary).
 * Emit one row per real slide: image in col1, a linked heading (title) plus
 * a tags paragraph in col2.
 */
export default function parse(element, { document }) {
  // Collect slides and remove Slick's cloned duplicates.
  let slides = Array.from(element.querySelectorAll('.slick-slide, .views-row'));
  slides = slides.filter((s) => !s.classList.contains('slick-cloned'));
  // Keep only outermost slide nodes (avoid nested matches).
  slides = slides.filter((s, _i, all) => !all.some((o) => o !== s && o.contains(s)));

  const cells = [];
  const seenHrefs = new Set();

  slides.forEach((slide) => {
    // Image (mandatory for a slide row).
    const media = slide.querySelector('.image--container picture, .image--container img, picture, img');
    if (!media) return;

    // Title + its link.
    const titleLink = slide.querySelector('.view-title-field a[href], .view-title-field a');
    const titleText = titleLink ? titleLink.textContent.trim() : '';
    const href = titleLink ? titleLink.getAttribute('href') : '';

    // Defensive dedupe by article href (guards against non-standard clone markers).
    if (href) {
      if (seenHrefs.has(href)) return;
      seenHrefs.add(href);
    }

    const contentCell = [];

    // Tags (e.g. "Covista | Covista Care Capacity Monitor").
    const tagField = slide.querySelector('.view-tag-field');
    if (tagField) {
      const tagText = tagField.textContent.replace(/\s+/g, ' ').trim();
      if (tagText) {
        const tagP = document.createElement('p');
        tagP.textContent = tagText;
        contentCell.push(tagP);
      }
    }

    // Title as a linked heading.
    if (titleText) {
      const heading = document.createElement('h3');
      if (href) {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.textContent = titleText;
        heading.appendChild(a);
      } else {
        heading.textContent = titleText;
      }
      contentCell.push(heading);
    }

    cells.push([media, contentCell.length ? contentCell : '']);
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-news', cells });
  element.replaceWith(block);
}
