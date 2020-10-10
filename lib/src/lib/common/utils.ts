/**
 * Created by bolor on 5/17/2020
 */

declare global {
  interface Array<T> {
    joinWithWhitespaceCleanup(): string;
  }
}

if (!Array.prototype.joinWithWhitespaceCleanup) {
  Array.prototype.joinWithWhitespaceCleanup = function <T>(this: Array<T>): string {
    const validClasses = this.filter(x => {
      return !!x;
    });
    return validClasses
      .join(' ')
      .replace(/  +/g, ' ');
  };
}

export class Utils {
  static getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}