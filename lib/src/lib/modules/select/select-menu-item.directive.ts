import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';

@Directive({
  selector: '[suiSelectMenuItem]'
})
export class SuiSelectMenuItemDirective {
  @Input() public suiValue: any = null;
  @Input() public suiSelected = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'item',
      Utils.getPropClass(this.suiSelected, 'active'),
      Utils.getPropClass(this.suiSelected, 'selected')
    ].joinWithWhitespaceCleanup();
  }
}
