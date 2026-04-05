import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[suiStepTitle]',
  exportAs: 'suiStepTitle'
})
export class SuiStepTitleDirective {
  @HostBinding('class')
  get classes(): string {
    return 'title';
  }
}
