import {Directive, HostBinding, Input} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';

export type SuiIconFloatDirection = 'right floated' | null;

@Directive({
  selector: '[sui-icon]',
  exportAs: 'suiIcon'
})
export class SuiIconDirective {
  @Input() public suiFloat: SuiIconFloatDirection = null;
  @Input() public suiIconType: string = null;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public suiFitted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiFitted, 'fitted'),
      Utils.getPropClass(this.disabled, 'disabled'),
      this.suiIconType,
      this.suiFloat,
      Utils.getPropClass(this.suiLoading, 'loading'),
      'icon'
    ].joinWithWhitespaceCleanup();
  }
}
