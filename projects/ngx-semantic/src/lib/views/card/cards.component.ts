/**
 * Created by bolor on 8/17/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {SuiWidth, Utils} from '../../common';

@Component({
  selector: '[sui-cards]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiCardsComponent {
  @Input() suiWidth: SuiWidth = null;
  @Input() suiStackable = false;
  @Input() suiDoubling = false;
  @Input() suiLink = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiWidth,
      Utils.getPropClass(this.suiLink, 'link'),
      Utils.getPropClass(this.suiStackable, 'stackable'),
      Utils.getPropClass(this.suiDoubling, 'doubling'),
      'cards'
    ].joinWithWhitespaceCleanup();
  }
}
