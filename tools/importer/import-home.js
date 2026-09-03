/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroOverlayParser from './parsers/hero-overlay.js';
import cardsStatsParser from './parsers/cards-stats.js';
import cardsLogosParser from './parsers/cards-logos.js';
import columnsMediaParser from './parsers/columns-media.js';
import carouselNewsParser from './parsers/carousel-news.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/covista-cleanup.js';
import sectionsTransformer from './transformers/covista-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-overlay': heroOverlayParser,
  'cards-stats': cardsStatsParser,
  'cards-logos': cardsLogosParser,
  'columns-media': columnsMediaParser,
  'carousel-news': carouselNewsParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  "name": "home",
  "description": "To be named in naming step",
  "urls": [
    "https://www.covista.com/"
  ],
  "blocks": [
    {
      "name": "hero-overlay",
      "instances": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.layout.layout--atge-one-column:nth-of-type(1) .c-banner.c-cv-banner"
      ]
    },
    {
      "name": "cards-stats",
      "instances": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.overlap.pad-bottom-40-desktop.cc-bg-secondary-mobile.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "name": "cards-logos",
      "instances": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--secondary.pad-bottom-0.pad-top-0.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "name": "columns-media",
      "instances": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-0.pad-bottom-0.p-section__align--none.edge-to-edge__mobile.layout.layout--atge-one-column .c-card.c-cv-card",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.pad-top-20-desktop.pad-bottom-40-desktop.p-section__align--none.layout.layout--atge-one-column .c-card.c-cv-card",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.pad-y-0.pad-bottom-50-desktop.p-section__align--none.layout.layout--atge-one-column .c-card.c-cv-card",
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__two-column.edge-to-edge.no-padding.no-max-width.layout__split--5050.sidebar-first.sidebar-left.p-universal-bg-color--secondary.pad-left-10-desktop.p-section__align--none.layout__spacing--default.no_constrain_bg_witdh.layout.layout--atge-two-column .c-card.c-cv-card"
      ]
    },
    {
      "name": "carousel-news",
      "instances": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.carousel-view--edge-to-edge.p-section__align--none.layout.layout--atge-one-column .slick-slider"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Full-bleed dark hero: background video/photo of a healthcare",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.layout.layout--atge-one-column:nth-of-type(1)",
      "style": null,
      "blocks": [
        "hero-overlay"
      ],
      "defaultContent": []
    },
    {
      "id": "section-2",
      "name": "Row of three stat items overlapping the hero (cream card pan",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.overlap.pad-bottom-40-desktop.cc-bg-secondary-mobile.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "cards-stats"
      ],
      "defaultContent": []
    },
    {
      "id": "section-3",
      "name": "Two-column feature: large photo of two medical professionals",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-0.pad-bottom-0.p-section__align--none.edge-to-edge__mobile.layout.layout--atge-one-column",
      "style": "accent",
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-4",
      "name": "Centered intro text on a soft accent (cream) background: 'Ou",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-0.pad-bottom-0.p-section__align--none.layout.layout--atge-one-column",
      "style": "accent",
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-0.pad-bottom-0.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "id": "section-5",
      "name": "Row of five institution logos (American University of the Ca",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--secondary.pad-bottom-0.pad-top-0.p-section__align--none.layout.layout--atge-one-column",
      "style": "accent",
      "blocks": [
        "cards-logos"
      ],
      "defaultContent": []
    },
    {
      "id": "section-6",
      "name": "Single centered 'Learn more' CTA button beneath the logos.",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-20.pad-bottom-40.p-section__align--none.layout.layout--atge-one-column",
      "style": "accent",
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.optimized-width.p-universal-bg-color--secondary.pad-top-20.pad-bottom-40.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "id": "section-7",
      "name": "Two-column media+text: photo of a male medical professional ",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.pad-top-20-desktop.pad-bottom-40-desktop.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-8",
      "name": "Two-column media+text (reversed): heading 'Careers that blen",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.pad-y-0.pad-bottom-50-desktop.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-9",
      "name": "Two-column split (accent background): left panel 'Stock info",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__two-column.edge-to-edge.no-padding.no-max-width.layout__split--5050.sidebar-first.sidebar-left.p-universal-bg-color--secondary.pad-left-10-desktop.p-section__align--none.layout__spacing--default.no_constrain_bg_witdh.layout.layout--atge-two-column",
      "style": "accent",
      "blocks": [
        "columns-media"
      ],
      "defaultContent": []
    },
    {
      "id": "section-10",
      "name": "Centered section heading 'News and stories'.",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-30.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.pad-top-30.p-section__align--none.layout.layout--atge-one-column"
      ]
    },
    {
      "id": "section-11",
      "name": "Horizontally-scrolling carousel of news/story cards; each ca",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.edge-to-edge.no-padding.no-max-width.p-universal-bg-color--none.carousel-view--edge-to-edge.p-section__align--none.layout.layout--atge-one-column",
      "style": null,
      "blocks": [
        "carousel-news"
      ],
      "defaultContent": []
    },
    {
      "id": "section-12",
      "name": "Light background, small footnote/legal text row.",
      "selector": "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.p-section__align--none.layout.layout--atge-one-column:nth-of-type(12)",
      "style": null,
      "blocks": [],
      "defaultContent": [
        "body > div.dialog-off-canvas-main-canvas > div.layout-container > main.page--main > div.layout-content > div.region.region__content > article.node__page.node__cv-page.node__page--full.node__cv-page--full.node.node--type-page.node--view-mode-full > div.node__content > div.t-layout__one-column.standard-width.p-universal-bg-color--none.p-section__align--none.layout.layout--atge-one-column:nth-of-type(12)"
      ]
    }
  ]
};

// TRANSFORMER REGISTRY - cleanup first, sections after
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

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
        if (seen.has(element)) return;
        seen.add(element);
        pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

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
