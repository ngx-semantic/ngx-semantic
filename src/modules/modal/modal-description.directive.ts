/**
 * Created by bolorundurowb on 1/22/2021
 */

import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[suiModalDescription]',
  exportAs: 'suiModalDescription'
})
export class SuiModalDescriptionDirective {
  @HostBinding('class')
  get classes(): string {
    return 'description';
  }
}
