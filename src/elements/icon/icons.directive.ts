/**
 * Created by bolorundurowb on 2/8/2021
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {SuiSize} from 'ngx-semantic/core/enums';

@Directive({
  selector: '[sui-icons]',
  exportAs: 'suiIcons'
})
export class SuiIconsDirective {
  @Input() public suiSize: SuiSize = null;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      this.suiSize,
      'icons'
    ];
  }
}
