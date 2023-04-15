import {Directive, ElementRef, HostBinding} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItemMetadata',
  selector: '[suiItemMetadata]'
})
export class SuiItemMetadataDirective extends BaseDirective {
  @HostBinding('class')
  get classes(): string {
    return 'meta';
  }

  constructor(element: ElementRef) {
    super(element);
  }
}
