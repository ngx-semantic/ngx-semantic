/**
 * Created by bolorundurowb on 2/8/2021
 */

import { Directive, Input } from '@angular/core';
import { SuiSize } from 'ngx-semantic/core/enums';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  selector: '[sui-icons]',
  exportAs: 'suiIcons'
})
export class SuiIconsDirective extends BaseDirective {
  @Input() public suiSize: SuiSize = null;

  get classes(): string {
    return [
      this.suiSize,
      'icons'
    ].join(' ');
  }
}
