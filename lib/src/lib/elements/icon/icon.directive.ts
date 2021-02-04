import {Directive, HostBinding, Input} from '@angular/core';

export type SuiIconFloatDirection = 'right floated' | null;

@Directive({
  selector: '[sui-icon]',
  exportAs: 'suiIcon'
})
export class SuiIconDirective {
  @Input() public suiFloat: SuiIconFloatDirection = null;
  @Input() public suiIconType: string = null;

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiIconType,
      this.suiFloat,
      'icon'
    ].joinWithWhitespaceCleanup();
  }
}
