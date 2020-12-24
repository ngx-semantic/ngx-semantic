/**
 * Created by bolorundurowb on 12/22/2020
 */

import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import {SuiMenuAttachment} from '../../collections/menu';
import {SuiColour} from '../../common';
import {SuiSegmentAttachment} from '../../elements/segment';
import {SuiTabComponent} from './tab.component';

export type SuiTabType = 'basic' | 'pointing' | 'secondary' | 'text' | null;
export type SuiTabMenuPosition = 'top' | 'bottom';

@Component({
  selector: 'sui-tabs',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="hasTabs">
      <ng-container *ngIf="isTop">
        <div sui-menu
             [suiColour]="suiColour"
             [suiAttached]="menuAttachment"
             [suiTabular]="isBasic"
             [suiSecondary]="isSecondary"
             [suiPointing]="isPointing"
             [suiText]="isText">
          <ng-container *ngFor="let tab of tabs; let i = index;">
            <div suiMenuItem
                 [suiDisabled]="tab.suiDisabled"
                 [suiActive]="isTabSelected(i)"
                 (click)="changeTab(tab, i)">
              <ng-container *ngIf="tab.suiIcon">
                <i sui-icon
                   [suiIconType]="tab.suiIcon"></i>
              </ng-container>

              {{tab.suiTitle}}
            </div>
          </ng-container>
        </div>
      </ng-container>

      <div class="active tab"
           sui-segment
           [suiAttached]="segmentAttachment">
        <ng-container *ngIf="currentTab">
          <ng-container
            *ngTemplateOutlet="currentTab.contentTemplate">
          </ng-container>
        </ng-container>
      </div>

      <ng-container *ngIf="!isTop">
        <div sui-menu
             [suiColour]="suiColour"
             [suiAttached]="menuAttachment"
             [suiTabular]="isBasic"
             [suiSecondary]="isSecondary"
             [suiPointing]="isPointing"
             [suiText]="isText">
          <ng-container *ngFor="let tab of tabs; let i = index;">
            <div suiMenuItem
                 [suiDisabled]="tab.suiDisabled"
                 [suiActive]="isTabSelected(i)"
                 (click)="changeTab(tab, i)">
              <ng-container *ngIf="tab.suiIcon">
                <i sui-icon
                   [suiIconType]="tab.suiIcon"></i>
              </ng-container>

              {{tab.suiTitle}}
            </div>
          </ng-container>
        </div>
      </ng-container>
    </ng-container>
  `
})
export class SuiTabsComponent implements AfterContentInit, AfterContentChecked {
  @ContentChildren(SuiTabComponent) public tabs: QueryList<SuiTabComponent> = new QueryList<SuiTabComponent>();

  @Input() public suiTabMenuPosition: SuiTabMenuPosition = 'top';
  @Input() public suiTabType: SuiTabType = 'basic';
  @Input() public suiColour: SuiColour = null;

  private selectedTabIndex = 0;
  public hasTabs = false;
  public currentTab: SuiTabComponent = null;

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

  get isTop(): boolean {
    return this.suiTabMenuPosition === 'top';
  }

  get menuAttachment(): SuiMenuAttachment {
    if (this.suiTabType === 'basic') {
      if (this.isTop) {
        return 'top';
      } else {
        return 'bottom';
      }
    }

    return null;
  }

  get segmentAttachment(): SuiSegmentAttachment {
    if (this.suiTabType === 'basic') {
      if (this.isTop) {
        return 'bottom attached';
      } else {
        return 'top attached';
      }
    }

    return null;
  }

  public changeTab(tab: SuiTabComponent, index: number): void {
    if (tab.suiDisabled) {
      return;
    }

    this.selectedTabIndex = index;
    this.setCurrentTab();
  }

  public isTabSelected(index: number): boolean {
    return this.selectedTabIndex === index;
  }

  constructor(public cdr: ChangeDetectorRef) {
  }

  public ngAfterContentInit(): void {
  }

  public ngAfterContentChecked(): void {
    this.setCurrentTab();
  }

  private setCurrentTab(): void {
    const tabs = this.tabs.toArray();
    this.hasTabs = tabs.length > 0;
    this.currentTab = tabs[this.selectedTabIndex];
    // this.cdr.markForCheck();
    // this.cdr.detectChanges();
  }
}
