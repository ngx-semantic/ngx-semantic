/**
 * Created by bolor on 6/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiMenuComponent} from './menu.component';
import {CommonModule} from '@angular/common';
import {SuiMenuItemDirective} from './menu-item.directive';
import {SuiSubMenuDirective} from './sub-menu.directive';
import {SuiMenuHeader} from './menu-header.directive';

@NgModule({
  declarations: [SuiMenuComponent, SuiMenuItemDirective, SuiSubMenuDirective, SuiMenuHeader],
  imports: [CommonModule],
  exports: [SuiMenuComponent, SuiMenuItemDirective, SuiSubMenuDirective, SuiMenuHeader]
})
export class SuiMenuModule {
}
