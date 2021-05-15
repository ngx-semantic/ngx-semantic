/**
 * Created by bolorundurowb on 5/15/2021
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiSegmentInline]',
  exportAs: 'suiSegmentInline'
})
export class SuiSegmentInlineDirective {
  @HostBinding('class')
  get classes(): string {
    return 'inline';
  }
}
