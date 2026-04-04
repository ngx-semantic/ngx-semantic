import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[suiStepContent]',
  exportAs: 'suiStepContent'
})
export class SuiStepContentDirective {
  @HostBinding('class')
  get classes(): string {
    return 'content';
  }
}
