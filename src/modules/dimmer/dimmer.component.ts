/**
 * Created by bolorundurowb on 1/17/2021
 */

import {
  ChangeDetectionStrategy, Component,
  Input, OnInit, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {ClassUtils} from 'ngx-semantic/core/util';
import {SuiDimmerContentAlignment} from './dimmer.directive';

@Component({
  selector: 'sui-dimmer',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngClass]="classes" style="display: flex !important;">
      <ng-container *ngIf="suiContent">
        <div class="content">
          <ng-container *ngTemplateOutlet="suiContent"></ng-container>
        </div>
      </ng-container>
    </div>
  `
})
export class SuiDimmerComponent implements OnInit {
  @Input() public suiAlignment: SuiDimmerContentAlignment = null;
  @Input() public suiBlurring = false;
  @Input() public suiInverted = false;
  @Input() public suiSimple = false;
  @Input() public suiFullPage = false;

  private _content;
  public classes = '';

  @Input()
  get suiContent(): TemplateRef<any> {
    return this._content;
  }

  set suiContent(content: TemplateRef<any>) {
    this._content = content;
  }

  public ngOnInit(): void {
    this.classes = this.genClasses();
  }

  private genClasses(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiFullPage, 'page'),
      ClassUtils.getPropClass(this.suiSimple, 'simple'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      this.suiAlignment,
      this.suiAlignment ? 'aligned' : '',
      'dimmer',
      'transition',
      'visible',
      'active'
    ].joinWithWhitespaceCleanup();
  }
}
