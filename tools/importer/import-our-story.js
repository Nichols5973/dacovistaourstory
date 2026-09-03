/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroOverlayParser from './parsers/hero-overlay.js';
import columnsMediaParser from './parsers/columns-media.js';
import quoteAccentParser from './parsers/quote-accent.js';
import accordionFaqParser from './parsers/accordion-faq.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/covista-cleanup.js';
import sectionsTransformer from './transformers/covista-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-overlay': heroOverlayParser,
  'columns-media': columnsMediaParser,
  'quote-accent': quoteAccentParser,
  'accordion-faq': accordionFaqParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  "name": "our-story",
  "description": "",
  "urls": [
    "https://www.covista.com/our-story"
  ],
  "blocks": [
    {
      "name": "hero-overlay",
      "instances": [
        ".c-banner.c-cv-banner"
      ]
    },
    {
      "name": "columns-media",
      "instances": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-0.pad-bottom-0.p-section__align--none.layout.layout--atge-one-column",
        "#approach",
        "#name",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--white.pad-y-20-desktop.p-section__align--none.layout.layout--atge-one-column:nth-of-type(6)",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--white.p-section__align--none.layout.layout--atge-one-column:nth-of-type(8)",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--white.pad-y-20-desktop.pad-top-0.pad-bottom-50-desktop.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "name": "quote-accent",
      "instances": [
        ".carrousel-testimonial",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--secondary.pad-bottom-50.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "name": "accordion-faq",
      "instances": [
        ".c-accordion.c-cv-accordion"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "light background, thin in-page navigation bar",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-0.pad-bottom-0.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-2",
      "name": "full-bleed dark hero image (healthcare workers in scrubs), w",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "hero-overlay"
      ],
      "defaultContent": []
    },
    {
      "id": "section-3",
      "name": "light background, two-column layout",
      "selector": "#approach",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-4",
      "name": "soft accent (pink) panel, portrait photo left, quote text ri",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--secondary.pad-bottom-50.p-section__align--none.layout.layout--atge-one-column",
      "style": "accent",
      "blocks": [
        "quote-accent"
      ],
      "defaultContent": []
    },
    {
      "id": "section-5",
      "name": "full-bleed dark green background, media (with video play but",
      "selector": "#name",
      "style": "dark",
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-6",
      "name": "light background, image left, text right with CTA button",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--white.pad-y-20-desktop.p-section__align--none.layout.layout--atge-one-column:nth-of-type(6)",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-7",
      "name": "light background, empty spacer/divider (desktop only)",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--white.pad-top-30.pad-bottom-40.hide-on-mobile.hide-on-tablet.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--white.pad-top-30.pad-bottom-40.hide-on-mobile.hide-on-tablet.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "id": "section-8",
      "name": "light background, text left with CTA button, image right",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--white.p-section__align--none.layout.layout--atge-one-column:nth-of-type(8)",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-9",
      "name": "light background, empty spacer/divider (desktop only)",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--white.pad-top-40.pad-bottom-30.hide-on-mobile.hide-on-tablet.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--white.pad-top-40.pad-bottom-30.hide-on-mobile.hide-on-tablet.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "id": "section-10",
      "name": "light background, image left, text right with CTA button",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--white.pad-y-20-desktop.pad-top-0.pad-bottom-50-desktop.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-11",
      "name": "light/grey background, FAQ heading with expandable question ",
      "selector": "#faq",
      "style": "grey",
      "blocks": [
        "accordion-faq"
      ],
      "defaultContent": [
        "#faq"
      ]
    },
    {
      "id": "section-12",
      "name": "light background, small footnote text",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-40.pad-bottom-30.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-40.pad-bottom-30.p-section__align--none.layout.layout--atge-one-column"
      ]
    }
  ]
};

// TRANSFORMER REGISTRY - cleanup runs first, sections after (adds <hr> + section metadata)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  const seen = new Set();
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements;
      try {
        elements = document.querySelectorAll(selector);
      } catch (e) {
        console.warn(`Invalid selector for "${blockDef.name}": ${selector}`);
        return;
      }
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        if (seen.has(element)) return; // avoid double-processing same element
        seen.add(element);
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. beforeTransform cleanup
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform cleanup + section breaks/metadata
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
