/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: covista site-wide cleanup.
 * Removes non-authorable site chrome and widgets. All selectors verified
 * against migration-work/cleaned.html for the our-story template.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie / consent widgets (cleaned.html line 5: <div id="consent_blackbar">;
    // line 1580: <span id="teconsent">). Removed before parsing so they don't
    // interfere with block matching.
    WebImporter.DOMUtils.remove(element, [
      '#consent_blackbar',
      '#teconsent',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable global chrome verified in cleaned.html:
    //   line 2:    <a class="skip-link"> "Skip to main content"
    //   line 10:   <header class="page--header"> (site header + main nav)
    //   line 1435: <footer class="page--footer"> (site footer)
    // Plus safe leftover elements (scripts/styles/iframes/etc.).
    WebImporter.DOMUtils.remove(element, [
      'header.page--header',
      'footer.page--footer',
      '.skip-link',
      'script',
      'style',
      'noscript',
      'iframe',
      'link',
      'source',
      'svg',
    ]);

    // Strip tracking/interaction attributes present in captured DOM.
    element.querySelectorAll('[data-once]').forEach((el) => el.removeAttribute('data-once'));
  }
}
