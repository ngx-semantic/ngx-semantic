/**
 * Created by bolor on 7/28/2020
 */

import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { SuiSize } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  selector: '[sui-feed]',
  exportAs: 'suiFeed'
})
export class SuiFeedDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;

  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'feed'
    ].join(' ');
  }
}
