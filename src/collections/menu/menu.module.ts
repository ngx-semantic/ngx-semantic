/**
 * Created by bolor on 6/17/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiMenuHeaderDirective} from './menu-header.directive';
import {SuiMenuItemDirective} from './menu-item.directive';
import {SuiMenuDirective} from './menu.directive';
import {SuiSubMenuDirective} from './sub-menu.directive';

@NgModule({
  declarations: [
    SuiMenuDirective,
    SuiMenuItemDirective,
    SuiSubMenuDirective,
    SuiMenuHeaderDirective
  ],
  imports: [CommonModule],
  exports: [
    SuiMenuDirective,
    SuiMenuItemDirective,
    SuiSubMenuDirective,
    SuiMenuHeaderDirective
  ]
})
export class SuiMenuModule {
}
