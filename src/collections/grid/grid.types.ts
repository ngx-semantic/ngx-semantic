/**
 * Shared types for the grid, row and column directives
 */

export type SuiGridTextAlignment = 'left aligned' | 'center aligned' | 'right aligned' | 'justified' | null;
export type SuiGridVerticalAlignment = 'top aligned' | 'middle aligned' | 'bottom aligned' | null;
export type SuiGridReverse =
  'computer reversed'
  | 'tablet reversed'
  | 'mobile reversed'
  | 'computer vertically reversed'
  | 'tablet vertically reversed'
  | 'mobile vertically reversed'
  | null;

export class GridClassUtils {
  public static reversedClass(input: SuiGridReverse | SuiGridReverse[]): string {
    if (!input) {
      return '';
    }

    return Array.isArray(input) ? input.filter(x => !!x).join(' ') : input;
  }

  public static widthClass(width: string | null, device?: string): string {
    if (!width) {
      return '';
    }

    return device ? `${width} wide ${device}` : `${width} wide`;
  }
}
