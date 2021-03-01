/**
 * Created by bolor on 8/17/2020
 */

import {Directive, Host, HostBinding, Input, Optional} from '@angular/core';
import {SuiColour, Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {SuiCardsDirective} from './cards.directive';

@Directive({
  selector: '[sui-card]',
  exportAs: 'suiCard'
})
export class SuiCardDirective {
  @Input() public suiColour: SuiColour = null;
  @Input() @InputBoolean() public suiLink = false;
  @Input() @InputBoolean() public suiCentered = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiRaised = false;

  private isChildComponent: boolean;

  @HostBinding('class')
  get classes(): string {
    return [
      this.isChildComponent ? '' : 'ui',
      this.suiColour,
      Utils.getPropClass(this.suiRaised, 'raised'),
      Utils.getPropClass(this.suiLink, 'link'),
      Utils.getPropClass(this.suiCentered, 'centered'),
      Utils.getPropClass(this.suiFluid, 'fluid'),
      'card'
    ].joinWithWhitespaceCleanup();
  }

  constructor(@Optional() @Host() private parent: SuiCardsDirective) {
    this.isChildComponent = !!parent;
  }
}
