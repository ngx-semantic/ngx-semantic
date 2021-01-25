/**
 * Created by bolorundurowb on 1/17/2021
 */

import {Component, HostBinding, Input, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';
import {SuiDimmerContentAlignment} from './dimmer.directive';

@Component({
  selector: 'sui-dimmer',
  encapsulation: ViewEncapsulation.None,
  template: `
  <ng-container *ngIf="suiContent">
    <div class="content">
      <ng-container *ngTemplateOutlet="suiContent"></ng-container>
    </div>
  </ng-container>
  `
})
export class SuiDimmerComponent {
  @Input() public suiContent: TemplateRef<any>;
  @Input() public suiAlignment: SuiDimmerContentAlignment = null;
  @Input() public suiBlurring = false;
  @Input() public suiInverted = false;
  @Input() public suiSimple = false;
  @Input() public suiFullPage = false;

  @HostBinding('class')
  get classes(): string {
    return [
      'ui',
      Utils.getPropClass(this.suiFullPage, 'page'),
      Utils.getPropClass(this.suiSimple, 'simple'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      this.suiAlignment,
      this.suiAlignment ? 'aligned' : '',
      'dimmer',
      'transition'
    ].joinWithWhitespaceCleanup();
  }
}
