import { Directive, ElementRef, inject } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  standalone: true,
  exportAs: 'suiItemDescription',
  selector: '[suiItemDescription]'
})
export class SuiItemDescriptionDirective extends BaseDirective {
  constructor() {
    const element = inject(ElementRef);

    super(element);
  }

  get classes(): string {
    return 'description';
  }
}
