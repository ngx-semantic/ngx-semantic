/**
 * Created by bolor on 7/3/2020
 */

import { Directive, ElementRef, Input, inject } from '@angular/core';
import { SuiColour } from 'ngx-semantic/core/enums';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

export type SuiMenuItemFitting = 'fitted' | 'horizontally fitted' | 'vertically fitted' | null;

@Directive({
  standalone: true,
  exportAs: 'suiMenuItem',
  selector: '[suiMenuItem]'
})
export class SuiMenuItemDirective extends BaseDirective {
  @Input() public suiColour: SuiColour = null;
  @Input() public suiFitted: SuiMenuItemFitting = null;
  @Input() @InputBoolean() public suiLink = false;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public suiBrowser = false;
  @Input() @InputBoolean() public suiHeader = false;
  @Input() @InputBoolean() public disabled = false;

  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return [
      this.suiColour,
      this.suiFitted,
      ClassUtils.getPropClass(this.suiHeader, 'header'),
      ClassUtils.getPropClass(this.suiLink, 'link'),
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.suiBrowser, 'browser'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      'item'
    ].join(' ');
  }
}
