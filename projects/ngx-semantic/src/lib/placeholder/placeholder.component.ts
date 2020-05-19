/**
 * Created by bolor on 5/6/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../common';

@Component({
  selector: '[sui-placeholder]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiPlaceholderComponent {
  @Input() suiActive = false;
  @Input() suiInverted = false;
  @Input() suiFluid = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      'placeholder'
    ].joinWithWhitespaceCleanup();
  }
}
