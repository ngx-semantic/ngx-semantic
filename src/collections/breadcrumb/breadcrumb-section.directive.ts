/**
 * Created by bolor on 5/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';
import {InputBoolean} from '../../core/util';

@Directive({
  exportAs: 'suiBreadcrumbSection',
  selector: '[suiBreadcrumbSection]'
})
export class SuiBreadcrumbSectionDirective {
  @Input() @InputBoolean() public suiActive = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.getActive(),
      'section'
    ].joinWithWhitespaceCleanup();
  }

  public getActive(): string {
    if (this.suiActive) {
      return 'active';
    }

    return '';
  }
}
