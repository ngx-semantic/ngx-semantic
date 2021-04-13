import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiStepDescription]',
  exportAs: 'suiStepDescription'
})
export class SuiStepDescriptionDirective {
  @HostBinding('class')
  get classes(): string {
    return 'description';
  }
}
