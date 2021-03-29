/**
 * Created by bolorundurowb on 1/17/2021
 */

import {Utils} from '../../common';
import {SuiDimmerContentAlignment} from './dimmer.directive';
import {
  ChangeDetectionStrategy,
  Component,
  Input, OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

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
  public classes: Array<string>;

  @Input()
  get suiContent(): TemplateRef<any> {
    return this._content;
  }

  set suiContent(content: TemplateRef<any>) {
    this._content = content;
  }

  ngOnInit(): void {
    this.classes = this.genClasses();
  }

  private genClasses(): Array<string> {
    return [
      'ui',
      Utils.getPropClass(this.suiFullPage, 'page'),
      Utils.getPropClass(this.suiSimple, 'simple'),
      Utils.getPropClass(this.suiInverted, 'inverted'),
      this.suiAlignment,
      this.suiAlignment ? 'aligned' : '',
      'dimmer',
      'transition',
      'active'
    ];
  }
}
