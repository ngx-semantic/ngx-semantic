/**
 * Created by bolor on 6/17/2020
 */

import {NgModule} from '@angular/core';
import {SuiMenuComponent} from './menu.component';
import {CommonModule} from '@angular/common';
import {SuiMenuItemDirective} from './menu-item.directive';

@NgModule({
  declarations: [SuiMenuComponent, SuiMenuItemDirective],
  imports: [CommonModule],
  exports: [SuiMenuComponent, SuiMenuItemDirective]
})
export class SuiMenuModule {
}
