import {Directive, ElementRef, HostBinding} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItemDescription',
  selector: '[suiItemDescription]'
})
export class SuiItemDescriptionDirective extends BaseDirective {
  @HostBinding('class')
  get classes(): string {
    return 'description';
  }

  constructor(element: ElementRef) {
    super(element);
  }
}
