/**
 * Created by bolorundurowb on 1/17/2021
 */

import {
  ChangeDetectionStrategy, Component,
  Input, OnChanges, OnInit, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiDimmerContentAlignment } from './dimmer.types';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sui-dimmer',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [ngClass]="classes"
      [ngStyle]="dimmerNgStyle"
      [attr.data-dimmer-name]="suiDimmerName || null"
      style="display: flex !important;">
      @if (suiContent) {
        <div class="content">
          <ng-container *ngTemplateOutlet="suiContent"></ng-container>
        </div>
      }
    </div>
  `
})
export class SuiDimmerComponent implements OnInit, OnChanges {
  @Input() public suiAlignment: SuiDimmerContentAlignment = null;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiSimple = false;
  @Input() @InputBoolean() public suiFullPage = false;
  @Input() @InputBoolean() public suiDisabled = false;
  @Input() public suiDurationMs: number | null = null;
  @Input() public suiTransition: string | null = null;
  @Input() public suiDimmerName: string | null = null;

  private _content: TemplateRef<any> | null = null;
  public classes = '';
  public dimmerNgStyle: Record<string, string> = {};

  @Input()
  get suiContent(): TemplateRef<any> | null {
    return this._content;
  }

  set suiContent(content: TemplateRef<any> | null) {
    this._content = content;
  }

  public ngOnInit(): void {
    this.refreshViewModel();
  }

  public ngOnChanges(): void {
    this.refreshViewModel();
  }

  private refreshViewModel(): void {
    this.classes = this.genClasses();
    this.dimmerNgStyle =
      this.suiDurationMs != null && this.suiDurationMs >= 0
        ? { 'transition-duration': `${this.suiDurationMs}ms` }
        : {};
  }

  private genClasses(): string {
    const transitionExtra = this.suiTransition?.trim() ?? '';
    return [
      'ui',
      ClassUtils.getPropClass(this.suiFullPage, 'page'),
      ClassUtils.getPropClass(this.suiSimple, 'simple'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      ClassUtils.getPropClass(this.suiDisabled, 'disabled'),
      this.suiAlignment,
      this.suiAlignment ? 'aligned' : '',
      'dimmer',
      'transition',
      transitionExtra,
      'visible',
      'active'
    ].filter(Boolean).join(' ');
  }
}
