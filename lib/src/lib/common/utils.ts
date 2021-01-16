/**
 * Created by bolor on 5/17/2020
 */

declare global {
  interface Array<T> {
    joinWithWhitespaceCleanup(): string;

    removeWhitespace(): Array<T>;
  }
}

if (!Array.prototype.joinWithWhitespaceCleanup) {
  Array.prototype.joinWithWhitespaceCleanup = function <T>(this: Array<T>): string {
    const validClasses = this.filter((x) => {
      return !!x;
    });
    return validClasses
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

export class Utils {
  public static getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
