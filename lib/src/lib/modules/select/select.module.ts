import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from '../../elements/icon';
import {SuiSelectMenuDirective} from './select-menu.directive';
import {SuiSelectComponent} from './select.component';

@NgModule({
  exports: [
    SuiSelectComponent,
    SuiSelectMenuDirective
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  declarations: [
    SuiSelectComponent,
    SuiSelectMenuDirective
  ]
})
export class SuiSelectModule {

}
