/**
 * Created by bolor on 9/20/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

@Component({
  selector: '[sui-steps]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiStepsComponent {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiOrdered = false;
  @Input() suiVertical = false;
  @Input() suiFluid = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      Utils.getPropClass(this.suiOrdered, 'ordered'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      Utils.getPropClass(this.suiVertical, 'vertical'),
      'steps'
    ].joinWithWhitespaceCleanup();
  }
}
