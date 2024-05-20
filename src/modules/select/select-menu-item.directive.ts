import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  selector: '[suiSelectMenuItem]'
})
export class SuiSelectMenuItemDirective extends BaseDirective {
  @Input() public suiValue: any = null;
  @Input() @InputBoolean() public suiSelected = false;
  @Input() @InputBoolean() public suiMultiple = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  get classes(): string {
    return [
      'item',
      ClassUtils.getPropClass(this.suiSelected, 'active'),
      ClassUtils.getPropClass(!this.suiMultiple && this.suiSelected, 'selected'),
      ClassUtils.getPropClass(this.suiMultiple && this.suiSelected, 'filtered')
    ].join(' ');
  }
}
