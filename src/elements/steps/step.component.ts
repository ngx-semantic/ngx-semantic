/**
 * Created by bolor on 9/20/2020
 */

import {Component, HostBinding, Input, TemplateRef} from '@angular/core';
import {ClassUtils, InputBoolean} from 'ngx-semantic/core/util';

@Component({
  selector: '[sui-step]',
  template: `
    <ng-container *ngIf="suiIcon">
      <i class="{{suiIcon}} icon"></i>
    </ng-container>

    <ng-content></ng-content>
  `
})
export class SuiStepComponent {
  @Input() public suiIcon: string = null;
  @Input() @InputBoolean() public suiActive = false;
  @Input() @InputBoolean() public disabled = false;
  @Input() @InputBoolean() public suiCompleted = false;
  @Input() @InputBoolean() public suiLink = false;

  @HostBinding('class')
  get classes(): string {
    return [
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiCompleted, 'completed'),
      ClassUtils.getPropClass(this.suiLink, 'link'),
      'step'
    ].join(' ');
  }
}
