import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[suiCardContent]',
  exportAs: 'suiCardContent'
})
export class SuiCardContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'content';
  }
}
