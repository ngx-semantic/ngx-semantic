/**
 * Created by bolorundurowb on 12/22/2020
 */

import {Component, ContentChildren, QueryList} from '@angular/core';
import {SuiTabComponent} from './tab.component';

@Component({
  selector: 'sui-tabs',
  preserveWhitespaces: false,
  template: `
    <ng-container *ngIf="tabs.length > 0">
      <div sui-menu
           suiAttached="top"
           suiTabular="true">
        <ng-container *ngFor="let tab of tabs">
          <div suiMenuItem>
            <ng-container *ngIf="tab.suiIcon">
              <i sui-icon
                 [suiIconType]="tab.suiIcon"></i>
            </ng-container>

            {{tab.suiTitle}}
          </div>
        </ng-container>
      </div>
    </ng-container>
  `
})
export class SuiTabsComponent {
  @ContentChildren(SuiTabComponent) public tabs: QueryList<SuiTabComponent> = new QueryList<SuiTabComponent>();
}
