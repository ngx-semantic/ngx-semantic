/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

export type SuiPlaceholderLineLength = 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short' | null;

@Directive({
  selector: '[suiPlaceholderLine]',
  exportAs: 'suiPlaceholderLine'
})
export class SuiPlaceholderLineDirective {
  @Input() suiLength: SuiPlaceholderLineLength = null;

  @HostBinding('class')
  get classes(): string {
    return [this.suiLength, 'line'].joinWithWhitespaceCleanup();
  }
}
