/**
 * Created by bolor on 9/20/2020
 */

import {Component, HostBinding, Input, TemplateRef} from '@angular/core';
import {ClassUtils} from 'ngx-semantic/core/util';

@Component({
  selector: '[sui-step]',
  template: `
    <ng-container *ngIf="suiIcon">
      <i class="{{suiIcon}} icon"></i>
    </ng-container>
    <ng-container *ngIf="suiContent">
      <div class="content">
        <ng-container *ngTemplateOutlet="suiContent"></ng-container>
      </div>
    </ng-container>
    <ng-content></ng-content>
  `
})
export class SuiStepComponent {
  @Input() public suiContent?: TemplateRef<any>;
  @Input() public suiIcon: string = null;
  @Input() public suiActive = false;
  @Input() public disabled = false;
  @Input() public suiCompleted = false;

  @HostBinding('class')
  get classes(): Array<string> {
    return [
      ClassUtils.getPropClass(this.suiActive, 'active'),
      ClassUtils.getPropClass(this.disabled, 'disabled'),
      ClassUtils.getPropClass(this.suiCompleted, 'disabled'),
      'step'
    ];
  }
}
