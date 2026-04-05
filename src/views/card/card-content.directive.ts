import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[suiCardContent]',
  exportAs: 'suiCardContent'
})
export class SuiCardContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'content';
  }
}
