import {Directive, HostBinding} from '@angular/core';

@Directive({
  exportAs: 'suiItemMetadata',
  selector: '[suiItemMetadata]'
})
export class SuiItemMetadataDirective {
  @HostBinding('class')
  get classes(): string {
    return 'meta';
  }
}
