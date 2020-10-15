/**
 * Created by bolor on 6/17/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiMenuHeaderDirective} from './menu-header.directive';
import {SuiMenuItemDirective} from './menu-item.directive';
import {SuiMenuComponent} from './menu.component';
import {SuiSubMenuDirective} from './sub-menu.directive';

@NgModule({
  declarations: [SuiMenuComponent, SuiMenuItemDirective, SuiSubMenuDirective, SuiMenuHeaderDirective],
  imports: [CommonModule],
  exports: [SuiMenuComponent, SuiMenuItemDirective, SuiSubMenuDirective, SuiMenuHeaderDirective],
})
export class SuiMenuModule {
}
