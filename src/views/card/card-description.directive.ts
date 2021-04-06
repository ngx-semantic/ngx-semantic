import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiCardDescription]',
  exportAs: 'suiCardDescription'
})
export class SuiCardDescriptionDirective {
  @HostBinding('class')
  get classes(): string {
    return 'description';
  }
}
