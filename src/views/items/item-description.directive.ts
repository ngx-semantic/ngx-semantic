import { Directive, ElementRef } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItemDescription',
  selector: '[suiItemDescription]'
})
export class SuiItemDescriptionDirective extends BaseDirective {
  constructor(element: ElementRef) {
    super(element);
  }

  get classes(): string {
    return 'description';
  }
}
