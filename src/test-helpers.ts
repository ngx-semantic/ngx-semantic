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
