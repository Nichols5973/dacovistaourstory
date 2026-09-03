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

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
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

  // tools/importer/parsers/cards-stats.js
  function parse2(element, { document: document2 }) {
    const cells = [];
    let statItems = Array.from(element.querySelectorAll(".c-universal-grid__item"));
    statItems = statItems.filter((it) => it.querySelector(".e-stat"));
    if (!statItems.length && element.querySelector(".e-stat")) {
      statItems = [element];
    }
    if (statItems.length) {
      statItems.forEach((item) => {
        const iconImg = item.querySelector(".c-icon img, .c-image img, picture");
        const iconSpan = item.querySelector('.e-icon-svg, span[class*="icon-"]');
        const iconCell = iconImg || iconSpan || "";
        const statEl = item.querySelector(".e-stat");
        const labelEl = item.querySelector(".e-stat-copy");
        const contentCell = [];
        if (statEl) {
          const numText = statEl.textContent.trim();
          if (numText) {
            const h = document2.createElement("h3");
            h.textContent = numText;
            contentCell.push(h);
          }
        }
        if (labelEl) {
          const labelText = labelEl.textContent.trim();
          if (labelText) {
            const p = document2.createElement("p");
            p.textContent = labelText;
            contentCell.push(p);
          }
        }
        if (iconCell || contentCell.length) {
          cells.push([iconCell, contentCell.length ? contentCell : ""]);
        }
      });
    } else {
      let cardItems = Array.from(element.querySelectorAll(".c-card__item, .c-cv-card__item"));
      if (!cardItems.length) cardItems = [element];
      cardItems.forEach((item) => {
        const media = item.querySelector(".c-card__item--media picture, .c-card__item--media img, picture, img");
        const heading = item.querySelector("h1, h2, h3, h4");
        const paras = Array.from(item.querySelectorAll(".c-card__item--copy p, .c-card__item--content p"));
        const cta = item.querySelector('.c-card__item--cta a[href], a[class*="btn"], a[class*="button"]');
        const contentCell = [];
        if (heading) contentCell.push(heading);
        paras.forEach((p) => {
          if (p.textContent.trim()) contentCell.push(p);
        });
        if (cta) contentCell.push(cta);
        if (media || contentCell.length) {
          cells.push([media || "", contentCell.length ? contentCell : ""]);
        }
      });
    }
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-logos.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    let logos = Array.from(element.querySelectorAll(".c-image, .c-cv-image"));
    logos = logos.filter((n, _i, all) => !all.some((o) => o !== n && o.contains(n)));
    if (logos.length) {
      logos.forEach((logo) => {
        const media = logo.querySelector("picture, img");
        if (!media) return;
        const anchor = logo.closest("a[href]");
        const contentCell = [];
        if (anchor && anchor.getAttribute("href")) {
          const img = media.querySelector ? media.querySelector("img") : null;
          const label = (media.tagName === "IMG" ? media.getAttribute("alt") : img && img.getAttribute("alt")) || "";
          if (label.trim()) {
            const link = document2.createElement("a");
            link.setAttribute("href", anchor.getAttribute("href"));
            link.textContent = label.trim();
            contentCell.push(link);
          }
        }
        cells.push([media, contentCell.length ? contentCell : ""]);
      });
    }
    if (!cells.length) {
      let media = Array.from(element.querySelectorAll("picture"));
      if (!media.length) media = Array.from(element.querySelectorAll("img"));
      media = media.filter((n, _i, all) => !all.some((o) => o !== n && o.contains(n)));
      media.forEach((m) => cells.push([m, ""]));
    }
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-logos", cells });
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
  function parse4(element, { document: document2 }) {
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

  // tools/importer/parsers/carousel-news.js
  function parse5(element, { document: document2 }) {
    let slides = Array.from(element.querySelectorAll(".slick-slide, .views-row"));
    slides = slides.filter((s) => !s.classList.contains("slick-cloned"));
    slides = slides.filter((s, _i, all) => !all.some((o) => o !== s && o.contains(s)));
    const cells = [];
    const seenHrefs = /* @__PURE__ */ new Set();
    slides.forEach((slide) => {
      const media = slide.querySelector(".image--container picture, .image--container img, picture, img");
      if (!media) return;
      const titleLink = slide.querySelector(".view-title-field a[href], .view-title-field a");
      const titleText = titleLink ? titleLink.textContent.trim() : "";
      const href = titleLink ? titleLink.getAttribute("href") : "";
      if (href) {
        if (seenHrefs.has(href)) return;
        seenHrefs.add(href);
      }
      const contentCell = [];
      const tagField = slide.querySelector(".view-tag-field");
      if (tagField) {
        const tagText = tagField.textContent.replace(/\s+/g, " ").trim();
        if (tagText) {
          const tagP = document2.createElement("p");
          tagP.textContent = tagText;
          contentCell.push(tagP);
        }
      }
      if (titleText) {
        const heading = document2.createElement("h3");
        if (href) {
          const a = document2.createElement("a");
          a.setAttribute("href", href);
          a.textContent = titleText;
          heading.appendChild(a);
        } else {
          heading.textContent = titleText;
        }
        contentCell.push(heading);
      }
      cells.push([media, contentCell.length ? contentCell : ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-news", cells });
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

  // tools/importer/import-home.js
  var parsers = {
    "hero-overlay": parse,
    "cards-stats": parse2,
    "cards-logos": parse3,
    "columns-media": parse4,
    "carousel-news": parse5
  };
  var PAGE_TEMPLATE = {
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
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
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
  return __toCommonJS(import_home_exports);
})();
