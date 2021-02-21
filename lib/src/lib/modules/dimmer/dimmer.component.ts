/**
 * Created by bolorundurowb on 1/17/2021
 */

import {Component, Input, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Utils} from '../../common';
import {InputBoolean} from '../../core/util';
import {SuiDimmerContentAlignment} from './dimmer.directive';

@Component({
  selector: 'sui-dimmer',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [ngClass]="classes">
      <ng-container *ngIf="suiContent">
        <div class="content">
          <ng-container *ngTemplateOutlet="suiContent"></ng-container>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    :host-context(.dimmer) {
      background-color: rgba(0, 0, 0, 0.85);
    }
  `]
})
export class SuiDimmerComponent {
  @Input() public suiContent: TemplateRef<any>;
  @Input() public suiAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiSimple = false;
  @Input() @InputBoolean() public suiFullPage = false;

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
