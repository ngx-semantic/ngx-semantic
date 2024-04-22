/**
 * Created by bolorundurowb on 1/25/2021
 */

import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { ClassUtils, InputBoolean } from 'ngx-semantic/core/util';
import { SuiAccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'sui-accordion',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [ngClass]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class SuiAccordionComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(SuiAccordionPanelComponent) private panels: QueryList<SuiAccordionPanelComponent>;

  @Input() @InputBoolean() public suiStyled = false;
  @Input() @InputBoolean() public suiFluid = false;
  @Input() @InputBoolean() public suiInverted = false;
  @Input() @InputBoolean() public suiCloseOthers = true;

  get classes(): string {
    return [
      'ui',
      ClassUtils.getPropClass(this.suiFluid, 'fluid'),
      ClassUtils.getPropClass(this.suiStyled, 'styled'),
      ClassUtils.getPropClass(this.suiInverted, 'inverted'),
      'accordion'
    ].join(' ');
  }

  public ngAfterContentInit() {
    if (this.suiCloseOthers) {
      this.panels.forEach((panel, index) => panel.isOpenChange
        .subscribe((x) => {
          // if the panel is being opened, then close others
          if (x) {
            this.panels.forEach((y, j) => {
              if (index !== j) {
                y.isOpen = false;
              }
            });
          }
        }));
    }
  }

  public ngOnDestroy() {
    this.panels.forEach((panel) => panel.isOpenChange.unsubscribe());
  }
}

