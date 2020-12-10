import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SuiFlagModule} from '../../elements/flag';
import {SuiIconModule} from '../../elements/icon';
import {SuiImageModule} from '../../elements/image';
import {SuiSelectMenuItemDirective} from './select-menu-item.directive';
import {SuiSelectMenuDirective} from './select-menu.directive';
import {SuiSelectComponent} from './select.component';

@NgModule({
  exports: [
    SuiSelectComponent,
    SuiSelectMenuDirective,
    SuiSelectMenuItemDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    SuiFlagModule,
    SuiIconModule,
    SuiImageModule
  ],
  declarations: [
    SuiSelectComponent,
    SuiSelectMenuDirective,
    SuiSelectMenuItemDirective
  ]
})
export class SuiSelectModule {
}
