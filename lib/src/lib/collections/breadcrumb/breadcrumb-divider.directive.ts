/**
 * Created by bolor on 5/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[suiBreadcrumbDivider]',
  exportAs: 'suiBreadcrumbDivider'
})
export class SuiBreadcrumbDividerDirective {
  @Input() suiIcon = '';

  @HostBinding('class')
  get classes(): string {
    return [
      this.getIcon(),
      'divider']
      .joinWithWhitespaceCleanup();
  }

  getIcon(): string {
    if (this.suiIcon) {
      return `${this.suiIcon} icon`;
    }

    return this.suiIcon;
  }
}
