/**
 * Created by bolor on 7/16/2020
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: false,
  exportAs: 'suiCommentMetadata',
  selector: '[suiCommentMetadata]'
})
export class SuiCommentMetadataDirective {
  @HostBinding('class')
  get classes(): string {
    return 'metadata';
  }
}
