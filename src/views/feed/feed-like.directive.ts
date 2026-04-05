/**
 * Created by bolor on 7/28/2020
 */

import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  exportAs: 'suiFeedLike',
  selector: '[suiFeedLike]'
})
export class SuiFeedLikeDirective {
  @HostBinding('class')
  get classes(): string {
    return 'like';
  }
}
