/**
 * Created by bolorundurowb on 12/22/2020
 */

import {Component, HostBinding, Input, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

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
  @Input() public suiLabel: string | number = null;
  @Input() @InputBoolean() public suiLoading = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiLabelCircular = false;

  @ViewChild('contentTemplate', { static: true }) public contentTemplate!: TemplateRef<any>;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiLoading, 'loading'),
      ClassUtils.getPropClass(this.disabled, 'disabled')
    ].join(' ');
  }
}
