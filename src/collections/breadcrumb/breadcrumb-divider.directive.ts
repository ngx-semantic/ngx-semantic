/**
 * Created by bolor on 5/26/2020
 */

import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  exportAs: 'suiBreadcrumbDivider',
  selector: '[suiBreadcrumbDivider]'
})
export class SuiBreadcrumbDividerDirective {
  @Input() public suiIcon = '';

  @HostBinding('class')
  get classes(): string {
    return [
      this.getIcon(),
      'divider'
    ].join(' ');
  }

  private getIcon(): string {
    if (this.suiIcon) {
      return `${this.suiIcon} icon`;
    }

    return this.suiIcon;
  }
}
