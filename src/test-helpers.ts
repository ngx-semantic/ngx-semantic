/**
 * Angular does not preserve the order of tokens in a host `[class]` binding, so specs must compare
 * class names as sets rather than as substrings of `className`.
 */
const tokens = (classes: string): string[] => classes.split(/\s+/).filter(Boolean);

/** Expects every class in the space separated `classes` string to be present on the element. */
export function expectClasses(el: Element, classes: string): void {
  tokens(classes).forEach(c => expect(el.classList.contains(c)).withContext(`class "${c}" in "${el.className}"`).toBeTrue());
}

/** Expects the element to have exactly the classes in the space separated `classes` string, in any order. */
export function expectExactClasses(el: Element, classes: string): void {
  expect(Array.from(el.classList).sort()).toEqual(tokens(classes).sort());
}


/** Checks a Semantic UI class-phrase selector, including rules for other viewport sizes. */
export function expectStylesheetMatch(element: Element, phrase: string): void {
  const matches = (rules: CSSRuleList): boolean => Array.from(rules).some(rule => {
    if (rule instanceof CSSStyleRule) {
      return rule.selectorText.split(',').some(selector =>
        selector.includes('[class*="' + phrase + '"]') && element.matches(selector));
    }
    return rule instanceof CSSGroupingRule && matches(rule.cssRules);
  });
  expect(Array.from(document.styleSheets).some(sheet => matches(sheet.cssRules)))
    .withContext('Semantic UI selector for ' + phrase + ' in ' + element.className).toBeTrue();
}
