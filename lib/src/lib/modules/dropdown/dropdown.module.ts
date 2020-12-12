/**
 * Created by bolor on 10/30/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiDropdownMenuDividerDirective} from './dropdown-menu-divider.directive';
import {SuiDropdownMenuHeaderDirective} from './dropdown-menu-header.directive';
import {SuiDropdownMenuItemDirective} from './dropdown-menu-item.directive';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';
import {SuiDropdownComponent} from './dropdown.component';

@NgModule({
  declarations: [
    SuiDropdownComponent,
    SuiDropdownMenuDirective,
    SuiDropdownMenuItemDirective,
    SuiDropdownMenuHeaderDirective,
    SuiDropdownMenuDividerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiDropdownComponent,
    SuiDropdownMenuDirective,
    SuiDropdownMenuItemDirective,
    SuiDropdownMenuHeaderDirective,
    SuiDropdownMenuDividerDirective
  ]
})
export class SuiDropdownModule {
}
