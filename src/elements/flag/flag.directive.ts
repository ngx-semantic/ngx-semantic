import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[sui-flag]',
  exportAs: 'suiFlag'
})
export class SuiFlagDirective {
  @Input() public suiCountry = '';

  @HostBinding('class')
  get classes(): string {
    return [
      this.suiCountry,
      'flag'
    ].join(' ');
  }
}
