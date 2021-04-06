/**
 * Created by bolor on 5/8/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

export type SuiPlaceholderLineLength = 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short' | null;

@Directive({
  exportAs: 'suiPlaceholderLine',
  selector: '[suiPlaceholderLine]'
})
export class SuiPlaceholderLineDirective {
  @Input() public suiLength: SuiPlaceholderLineLength = null;

  @HostBinding('class')
  get classes(): string {
    return [this.suiLength, 'line'].join(' ');
  }
}
