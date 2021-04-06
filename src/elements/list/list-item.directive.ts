/**
 * Created by bolorundurowb on 2/6/2021
 */

import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[suiListItem]',
  exportAs: 'suiListItem'
})
export class SuiListItemDirective {
  @HostBinding('class')
  get classes(): string {
    return 'item';
  }
}
