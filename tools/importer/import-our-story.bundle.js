/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-our-story.js
  var import_our_story_exports = {};
  __export(import_our_story_exports, {
    default: () => import_our_story_default
  });

  // tools/importer/parsers/hero-overlay.js
  function parse(element, { document: document2 }) {
    const mediaScope = element.querySelector(
      '.p-banner__media, .p-cv-banner__media, [class*="banner__media"]'
    );
    let bgImage = null;
    if (mediaScope) {
      bgImage = mediaScope.querySelector("picture") || mediaScope.querySelector("img");
    }
    if (!bgImage) {
      bgImage = element.querySelector("picture") || element.querySelector("img");
    }
    const heading = element.querySelector(
      '.p-banner-heading, [class*="banner--heading"], h1, h2'
    );
    const copyWrap = element.querySelector(
      '.p-banner-copy, [class*="banner-copy"], [class*="banner--copy"]'
    );
    const copyNodes = copyWrap ? Array.from(copyWrap.querySelectorAll(":scope > *")).filter((n) => n.textContent.trim()) : [];
    const ctaLinks = Array.from(
      element.querySelectorAll('.p-banner__content a[href], [class*="banner__content"] a[href]')
    );
    if (!heading && !copyNodes.length && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (copyNodes.length) contentCell.push(...copyNodes);
    else if (copyWrap) contentCell.push(copyWrap);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-media.js
  var CONTENT_SELECTOR = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "ul",
    "ol",
    "blockquote",
    "picture",
    "img:not(picture img)",
    "video",
    "iframe",
    'a[href][class*="btn"]:not(p a)',
    'a[href][class*="button"]:not(p a)'
  ].join(", ");
  function collectContent(scope) {
    const nodes = Array.from(scope.querySelectorAll(CONTENT_SELECTOR)).filter((n) => {
      if (n.matches("picture, img, video, iframe")) return true;
      return n.textContent.trim().length > 0;
    });
    const top = nodes.filter((n) => !nodes.some((other) => other !== n && other.contains(n)));
    return top;
  }
  function parse2(element, { document: document2 }) {
    const regions = Array.from(element.querySelectorAll(".layout__region, .grid__container--item")).filter((r, _i, all) => !all.some((other) => other !== r && other.contains(r)));
    const columnCells = [];
    if (regions.length) {
      regions.forEach((region) => {
        const content = collectContent(region);
        if (content.length) columnCells.push(content);
      });
    }
    if (!columnCells.length) {
      const content = collectContent(element);
      if (content.length) columnCells.push(content);
    }
    if (!columnCells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [columnCells];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-media", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-accent.js
  function parse3(element, { document: document2 }) {
    const slide = element.querySelector(".c-carousel__item, .c-cv-carousel__item") || element;
    const mediaScope = slide.querySelector('[class*="carousel__media"], [class*="carousel__-media"]') || slide;
    let image = mediaScope.querySelector("picture");
    if (image) {
      const realImg = Array.from(mediaScope.querySelectorAll("img")).find((img) => img.getAttribute("src") && !img.getAttribute("src").startsWith("data:"));
      if (realImg && !image.contains(realImg)) image = realImg;
    } else {
      image = Array.from(mediaScope.querySelectorAll("img")).find((img) => img.getAttribute("src") && !img.getAttribute("src").startsWith("data:"));
    }
    const quote = slide.querySelector('.e-quote, [class*="quote"]');
    let attribution = slide.querySelector(
      '[class*="content--subheading"] p, [class*="content-headings"] p'
    );
    if (!attribution && quote) {
      const subheading = quote.closest('[class*="subheading"], [class*="content-headings"]') || quote.parentElement && quote.parentElement.parentElement;
      if (subheading) {
        attribution = Array.from(subheading.querySelectorAll("p")).find((p) => p.textContent.trim() && !p.closest(".e-quote"));
      }
    }
    if (!quote && !attribution && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (image) cells.push([image]);
    const contentCell = [];
    if (quote) contentCell.push(quote);
    if (attribution) contentCell.push(attribution);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "quote-accent", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse4(element, { document: document2 }) {
    const items = Array.from(
      element.querySelectorAll(".p-accordion__item, .p-cv-accordion__item")
    );
    const cells = [];
    items.forEach((item) => {
      const headingWrap = item.querySelector(
        ".p-accordion__item--heading, .p-cv-accordion__item--heading"
      );
      const bodyWrap = item.querySelector(
        ".p-accordion__item--body, .p-cv-accordion__item--body"
      );
      let titleCell = null;
      if (headingWrap) {
        const headings = Array.from(headingWrap.querySelectorAll("h1, h2, h3, h4, h5, h6")).filter((h) => h.textContent.trim());
        if (headings.length) {
          titleCell = headings[0];
        } else if (headingWrap.textContent.trim()) {
          titleCell = headingWrap;
        }
      }
      let contentCell = null;
      if (bodyWrap && bodyWrap.textContent.trim()) {
        const bodyNodes = Array.from(bodyWrap.querySelectorAll(":scope > *")).filter((n) => n.textContent.trim() || n.querySelector("img"));
        contentCell = bodyNodes.length ? bodyNodes : bodyWrap;
      }
      if (titleCell) {
        cells.push([titleCell, contentCell || ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/covista-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#consent_blackbar",
        "#teconsent"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.page--header",
        "footer.page--footer",
        ".skip-link",
        "script",
        "style",
        "noscript",
        "iframe",
        "link",
        "source",
        "svg"
      ]);
      element.querySelectorAll("[data-once]").forEach((el) => el.removeAttribute("data-once"));
    }
  }

  // tools/importer/transformers/covista-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-our-story.js
  var parsers = {
    "hero-overlay": parse,
    "columns-media": parse2,
    "quote-accent": parse3,
    "accordion-faq": parse4
  };
  var PAGE_TEMPLATE = {
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
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    const seen = /* @__PURE__ */ new Set();
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        let elements;
        try {
          elements = document2.querySelectorAll(selector);
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
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_our_story_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_our_story_exports);
})();
