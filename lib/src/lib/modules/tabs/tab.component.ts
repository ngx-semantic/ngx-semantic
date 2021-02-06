/**
 * Created by bolorundurowb on 12/22/2020
 */

import {Component, HostBinding, Input, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';

@Component({
  selector: 'sui-tab',
  exportAs: 'suiTab',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class SuiTabComponent {
  @Input() public suiContent: TemplateRef<any>;
  @Input() public suiTitle: string = null;
  @Input() public suiIcon: string = null;
  @Input() public suiLoading = false;
  @Input() public disabled = false;

  @ViewChild('contentTemplate', { static: true }) public contentTemplate!: TemplateRef<any>;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiLoading, 'loading'),
      Utils.getPropClass(this.disabled, 'disabled')
    ].joinWithWhitespaceCleanup();
  }
}
