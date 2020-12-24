/**
 * Created by bolorundurowb on 12/22/2020
 */

import {Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {SuiMenuAttachment} from '../../collections/menu';
import {SuiColour} from '../../common';
import {SuiSegmentAttachment} from '../../elements/segment';
import {SuiTabComponent} from './tab.component';

export type SuiTabType = 'basic' | 'pointing' | 'secondary' | 'text' | null;
export type SuiTabMenuPosition = 'top' | 'bottom';

@Component({
  selector: 'sui-tabs',
  preserveWhitespaces: false,
  template: `
    <ng-container *ngIf="tabs.length > 0">
      <div sui-menu
           [suiColour]="suiColour"
           [suiAttached]="menuAttachment"
           [suiTabular]="isBasic"
           [suiSecondary]="isSecondary"
           [suiPointing]="isPointing"
           [suiText]="isText">
        <ng-container *ngFor="let tab of tabs; let i = index;">
          <div suiMenuItem
               [suiActive]="isTabSelected(tab, i)"
               (click)="changeTab(i)">
            <ng-container *ngIf="tab.suiIcon">
              <i sui-icon
                 [suiIconType]="tab.suiIcon"></i>
            </ng-container>

            {{tab.suiTitle}}
          </div>
        </ng-container>
      </div>
      <div class="active tab"
           sui-segment
           [suiAttached]="segmentAttachment">
        <ng-container *ngTemplateOutlet="currentTab"></ng-container>
      </div>
    </ng-container>
  `
})
export class SuiTabsComponent {
  @ContentChildren(SuiTabComponent) public tabs: QueryList<SuiTabComponent> = new QueryList<SuiTabComponent>();

  @Input() public suiTabType: SuiTabType = 'basic';
  @Input() public suiColour: SuiColour = null;

  private selectedTabIndex = 0;

  get isSecondary(): boolean {
    return this.suiTabType === 'secondary';
  }

  get isBasic(): boolean {
    return this.suiTabType === 'basic';
  }

  get isPointing(): boolean {
    return this.suiTabType === 'pointing';
  }

  get isText(): boolean {
    return this.suiTabType === 'text';
  }

  get menuAttachment(): SuiMenuAttachment {
    if (this.suiTabType === 'basic') {
      return 'top';
    }

    return null;
  }

  get segmentAttachment(): SuiSegmentAttachment {
    if (this.suiTabType === 'basic') {
      return 'bottom attached';
    }

    return null;
  }

  get currentTab(): TemplateRef<any> {
    return this.tabs[this.selectedTabIndex]?.contentTemplate;
  }

  public changeTab(index: number): void {
    this.selectedTabIndex = index;
  }

  public isTabSelected(tab: SuiTabComponent, index: number): boolean {
    if (tab.disabled) {
      return;
    }

    return this.selectedTabIndex === index;
  }
}
