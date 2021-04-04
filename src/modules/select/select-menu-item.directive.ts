import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

@Directive({
  selector: '[suiSelectMenuItem]'
})
export class SuiSelectMenuItemDirective {
  @Input() public suiValue: any = null;
  @Input() @InputBoolean() public suiSelected = false;
  @Input() @InputBoolean() public suiMultiple = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'item',
      ClassUtils.getPropClass(this.suiSelected, 'active'),
      ClassUtils.getPropClass(!this.suiMultiple && this.suiSelected, 'selected'),
      ClassUtils.getPropClass(this.suiMultiple && this.suiSelected, 'filtered')
    ].joinWithWhitespaceCleanup();
  }
}
