/**
 * Created by bolor on 8/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiColour, Utils} from '../../common';

@Component({
  selector: '[sui-card]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiCardComponent {
  @Input() suiColour: SuiColour = null;
  @Input() suiLink = false;
  @Input() suiCentered = false;
  @Input() suiFluid = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiColour,
      Utils.getPropClass(this.suiLink, 'link'),
      Utils.getPropClass(this.suiCentered, 'centered'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      'card'
    ].joinWithWhitespaceCleanup();
  }
}
