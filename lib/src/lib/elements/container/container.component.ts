/**
 * Created by bolor on 9/22/2020
 */

import {Component, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

export type SuiContainerAlignment = 'left aligned' | 'right aligned' | 'center aligned' | 'justified' | null;

@Component({
  selector: '[sui-container]',
  template: `
    <ng-content></ng-content>
  `
})
export class SuiContainerComponent {
  @Input() suiAlignment: SuiContainerAlignment = null;
  @Input() suiText = false;
  @Input() suiFluid = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiAlignment,
      Utils.getPropClass(this.suiText, 'text'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      'container'
    ].joinWithWhitespaceCleanup();
  }
}
