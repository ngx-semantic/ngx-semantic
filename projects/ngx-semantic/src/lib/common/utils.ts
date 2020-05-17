/**
 * Created by bolor on 5/17/2020
 */

export class Utils {
  static getPropClass(state: boolean, className: string): string {
    if (!state) {
      return '';
    }

    return className;
  }
}
