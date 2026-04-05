import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[suiCardHeader]',
  exportAs: 'suiCardHeader'
})
export class SuiCardHeaderDirective {
  @HostBinding('class')
  get classes(): string {
    return 'header';
  }
}
