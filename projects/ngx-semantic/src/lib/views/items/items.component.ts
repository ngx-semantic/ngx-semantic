/**
 * Created by bolor on 8/2/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

export type SuiItemsRelaxation = 'relaxed' | 'very relaxed' | null;

@Component({
  selector: '[sui-items]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiItemsComponent {
  @Input() suiRelaxed: SuiItemsRelaxation = null;
  @Input() suiDivided = false;
  @Input() suiUnstackable = false;
  @Input() suiLink = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiRelaxed,
      Utils.getPropClass(this.suiDivided, 'divided'),
      Utils.getPropClass(this.suiUnstackable, 'unstackable'),
      Utils.getPropClass(this.suiLink, 'link'),
      'items'
    ].joinWithWhitespaceCleanup();
  }
}
