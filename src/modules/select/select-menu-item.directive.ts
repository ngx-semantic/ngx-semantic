import {Directive, HostBinding, Input} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  selector: '[suiSelectMenuItem]'
})
export class SuiSelectMenuItemDirective {
  @Input() public suiValue: any = null;
  @Input() @InputBoolean() public suiSelected = false;
  @Input() @InputBoolean() public suiMultiple = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      'item',
      ClassUtils.getPropClass(this.suiSelected, 'active'),
      ClassUtils.getPropClass(!this.suiMultiple && this.suiSelected, 'selected'),
      ClassUtils.getPropClass(this.suiMultiple && this.suiSelected, 'filtered')
    ];
  }
}
