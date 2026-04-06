/**
 * Created by bolor on 8/17/2020
 */

import { Directive, HostBinding, Input, inject } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiColour } from 'ngx-semantic/core/enums';
import { SuiCardsDirective } from './cards.directive';

@Directive({
  standalone: true,
  selector: '[sui-card]',
  exportAs: 'suiCard'
})
export class SuiCardDirective {
  private parent = inject(SuiCardsDirective, { optional: true, host: true });

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
      ClassUtils.getPropClass(this.suiRaised, 'raised'),
      ClassUtils.getPropClass(this.suiLink, 'link'),
      ClassUtils.getPropClass(this.suiCentered, 'centered'),
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      'card'
    ].join(' ');
  }

  constructor() {
    const parent = this.parent;

    this.isChildComponent = !!parent;
  }
}
