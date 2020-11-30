import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiSelectComponent} from './select.component';
import {SuiIconModule} from '../../elements/icon';

@NgModule({
  exports: [
    SuiSelectComponent
  ],
  imports: [
    CommonModule,
    SuiIconModule
  ],
  declarations: [
    SuiSelectComponent
  ]
})
export class SuiSelectModule {

}
