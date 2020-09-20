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
        {{suiContent}}
      </div>
    </ng-container>
    <ng-content></ng-content>
  `
})
export class SuiStepComponent {
  @Input() suiContent?: TemplateRef<any>;
  @Input() suiIcon: string = null;
  @Input() suiActive = false;
  @Input() suiDisabled = false;
  @Input() suiCompleted = false;

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
