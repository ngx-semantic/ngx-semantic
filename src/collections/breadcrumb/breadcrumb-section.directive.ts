/**
 * Created by bolor on 5/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';

@Directive({
  exportAs: 'suiBreadcrumbSection',
  selector: '[suiBreadcrumbSection]'
})
export class SuiBreadcrumbSectionDirective {
  @Input() @InputBoolean() public suiActive = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      this.getActive(),
      'section'
    ];
  }

  public getActive(): string {
    if (this.suiActive) {
      return 'active';
    }

    return '';
  }
}
