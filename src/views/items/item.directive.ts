/**
 * Created by bolor on 8/2/2020
 */

import {Directive, ElementRef, HostBinding} from '@angular/core';
import {BaseDirective} from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiItem',
  selector: '[suiItem]'
})
export class SuiItemDirective extends BaseDirective {
  @HostBinding('class')
  get classes(): string {
    return 'item';
  }

  constructor(element: ElementRef) {
    super(element);
  }
}
