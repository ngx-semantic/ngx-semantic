/**
 * Created by bolor on 5/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';

@Directive({
  selector: '[sui-breadcrumb]',
  exportAs: 'suiBreadcrumb'
})
export class SuiBreadcrumbDirective {
  @Input() public suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      this.suiSize,
      'breadcrumb'
    ].join(' ');
  }
}
