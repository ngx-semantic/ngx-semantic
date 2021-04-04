export {};

declare global {
  interface Array<T> {
    joinWithWhitespaceCleanup(): string;

    removeWhitespace(): Array<T>;
  }
}

if (!Array.prototype.joinWithWhitespaceCleanup) {
  Array.prototype.joinWithWhitespaceCleanup = function <T>(this: Array<T>): string {
    return this.removeWhitespace()
      .join(' ')
      .replace(/  +/g, ' ');
  };
}

if (!Array.prototype.removeWhitespace) {
  Array.prototype.removeWhitespace = function <T>(this: Array<T>): Array<T> {
    return this.filter((x) => {
      return !!x;
    });
  };
}
