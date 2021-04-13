import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiStepTitle]',
  exportAs: 'suiStepTitle'
})
export class SuiStepTitleDirective {
  @HostBinding('class')
  get classes(): string {
    return 'title';
  }
}
