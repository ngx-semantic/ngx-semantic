/**
 * Created by bolorundurowb on 12/22/2020
 */

import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChildren, EventEmitter,
  Input, Output,
  QueryList, ViewEncapsulation
} from '@angular/core';
import {InputBoolean} from 'ngx-semantic/core/util';
import {SuiTabComponent} from 'ngx-semantic/modules/tabs/tab.component';
import {SuiColour} from 'ngx-semantic/core/enums';
import {SuiMenuAttachment} from 'ngx-semantic/collections/menu';
import {SuiSegmentAttachment} from 'ngx-semantic/elements/segment';

export type SuiTabType = 'basic' | 'pointing' | 'secondary' | 'text' | 'bordered' | 'borderless';
export type SuiTabMenuPosition = 'top' | 'bottom';

@Component({
  selector: 'sui-tabs',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="hasTabs">
      <ng-container *ngIf="isTop">
        <ng-container *ngTemplateOutlet="tabMenu"></ng-container>
      </ng-container>

      <div class="active tab"
           sui-segment
           [class.loading]="currentTab.suiLoading"
           [suiAttached]="segmentAttachment">
        <ng-container *ngIf="currentTab">
          <ng-container
            *ngTemplateOutlet="currentTab.contentTemplate">
          </ng-container>
        </ng-container>
      </div>

      <ng-container *ngIf="!isTop">
        <ng-container *ngTemplateOutlet="tabMenu"></ng-container>
      </ng-container>
    </ng-container>

    <ng-template #tabMenu>
      <div sui-menu
           [suiInverted]="suiInverted"
           [suiColour]="suiColour"
           [suiAttached]="menuAttachment"
           [suiTabular]="isBasic"
           [suiSecondary]="isSecondary"
           [suiPointing]="isPointing"
           [suiText]="isText"
           [suiBorderless]="isBorderless">
        <ng-container *ngFor="let tab of tabs; let i = index;">
          <div suiMenuItem
               [disabled]="tab.disabled"
               [suiActive]="isTabSelected(i)"
               (click)="changeTab(tab, i)">
            <ng-container *ngIf="tab.suiIcon">
              <i sui-icon
                 [suiIconType]="tab.suiIcon"></i>
            </ng-container>

            {{tab.suiTitle}}

            <ng-container *ngIf="tab.suiLabel">
              <div sui-label>
                {{tab.suiLabel}}
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </ng-template>
  `
})
export class SuiTabsComponent implements AfterContentChecked {
  @ContentChildren(SuiTabComponent) public tabs: QueryList<SuiTabComponent> = new QueryList<SuiTabComponent>();

  @Input() public suiTabMenuPosition: SuiTabMenuPosition = 'top';
  @Input() public suiTabType: SuiTabType = 'basic';
  @Input() public suiColour: SuiColour = null;
  @Input() @InputBoolean() public suiInverted = false;

  @Output() public readonly suiSelectedIndexChanged = new EventEmitter<number>();

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

  get isBorderless(): boolean {
    return this.suiTabType === 'borderless';
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
    if (tab.disabled) {
      return;
    }

    const tabChanged = this.selectedTabIndex !== index;

    this.selectedTabIndex = index;
    this.setCurrentTab();

    if (tabChanged) {
      this.suiSelectedIndexChanged.emit(this.selectedTabIndex);
    }
  }

  public isTabSelected(index: number): boolean {
    return this.selectedTabIndex === index;
  }

  public ngAfterContentChecked(): void {
    this.setCurrentTab();
  }

  private setCurrentTab(): void {
    const tabs = this.tabs.toArray();
    this.hasTabs = tabs.length > 0;
    this.currentTab = tabs[this.selectedTabIndex];
  }
}
