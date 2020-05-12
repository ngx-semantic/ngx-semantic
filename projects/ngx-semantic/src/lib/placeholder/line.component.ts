/**
 * Created by bolor on 5/8/2020
 */

import {Component, HostBinding, Input} from '@angular/core';

export type SuiPlaceholderLineLength = 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short' | null;

@Component({
  selector: '[sui-placeholder-line]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiPlaceholderLineComponent {
  @Input() suiLength: SuiPlaceholderLineLength = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiLength,
      'line'
    ].join(' ');
  }
}
