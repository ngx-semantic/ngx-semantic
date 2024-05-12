export class ClassUtils {
  public static getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }

  public static combineToClass(input: string[]): string {
    return input.filter(x => !!x).join(' ').trim();
  }

  public static removeExcessWhitespace(input: string): string {
    return input.replace(/\s\s+/g, ' ').trim();
  }
}
