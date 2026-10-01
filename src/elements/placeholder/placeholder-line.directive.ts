/**
 * Created by bolor on 5/8/2020
 */

import { Directive, Input } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiPlaceholderLineLength = 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short' | null;

@Directive({
  standalone: true,
  exportAs: 'suiPlaceholderLine',
  selector: '[suiPlaceholderLine]'
})
export class SuiPlaceholderLineDirective extends BaseDirective {
  @Input() public suiLength: SuiPlaceholderLineLength = null;

  get classes(): string {
    return [this.suiLength, 'line'].join(' ');
  }
}
