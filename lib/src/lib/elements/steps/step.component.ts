/**
 * Created by bolor on 9/20/2020
 */

import {Component, HostBinding, Input, TemplateRef} from '@angular/core';
import {Utils} from '../../common';

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
  @Input() public suiDisabled = false;
  @Input() public suiCompleted = false;

  @HostBinding('class')
  get classes(): string {
    return [
      Utils.getPropClass(this.suiActive, 'active'),
      Utils.getPropClass(this.suiDisabled, 'disabled'),
      Utils.getPropClass(this.suiCompleted, 'disabled'),
      'step'
    ].joinWithWhitespaceCleanup();
  }
}
