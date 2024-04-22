import {Directive, HostBinding} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItemExtra',
  selector: '[suiItemExtra]'
})
export class SuiItemExtraContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'extra';
  }
}
