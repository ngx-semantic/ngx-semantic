/**
 * Created by bolor on 10/30/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SuiDropdownMenuDividerDirective} from './dropdown-menu-divider.directive';
import {SuiDropdownMenuItemDirective} from './dropdown-menu-item.directive';
import {SuiDropdownMenuDirective} from './dropdown-menu.directive';
import {SuiDropdownComponent} from './dropdown.component';

@NgModule({
  declarations: [
    SuiDropdownComponent,
    SuiDropdownMenuDirective,
    SuiDropdownMenuItemDirective,
    SuiDropdownMenuDividerDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SuiDropdownComponent,
    SuiDropdownMenuDirective,
    SuiDropdownMenuItemDirective,
    SuiDropdownMenuDividerDirective
  ]
})
export class SuiDropdownModule {
}
