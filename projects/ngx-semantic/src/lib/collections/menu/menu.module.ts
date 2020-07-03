/**
 * Created by bolor on 6/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiMenuComponent} from './menu.component';
import {CommonModule} from '@angular/common';
import {SuiMenuItemDirective} from './menu-item.directive';
import {SuiSubMenuDirective} from './sub-menu.directive';

@NgModule({
  declarations: [SuiMenuComponent, SuiMenuItemDirective, SuiSubMenuDirective],
  imports: [CommonModule],
  exports: [SuiMenuComponent, SuiMenuItemDirective, SuiSubMenuDirective]
})
export class SuiMenuModule {
}
