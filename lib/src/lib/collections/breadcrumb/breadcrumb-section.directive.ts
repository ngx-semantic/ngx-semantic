/**
 * Created by bolor on 5/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[suiBreadcrumbDivider]',
  exportAs: 'suiBreadcrumbDivider'
})
export class SuiBreadcrumbSectionDirective {
  @Input() suiActive = false;

  @HostBinding('class')
  get classes(): string {
    return [
      this.getActive(),
      'section'
    ].joinWithWhitespaceCleanup();
  }

  getActive(): string {
    if (this.suiActive) {
      return 'active';
    }

    return '';
  }
}
