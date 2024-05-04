/**
 * Created by bolor on 5/26/2020
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { BaseDirective } from 'ngx-semantic/core/base';

@Directive({
  exportAs: 'suiBreadcrumbDivider',
  selector: '[suiBreadcrumbDivider]'
})
export class SuiBreadcrumbDividerDirective extends BaseDirective {
  @Input() public suiIcon = '';

  constructor(element: ElementRef) {
    super(element);
  }

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
