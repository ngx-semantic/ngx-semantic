import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiSelectComponent} from './select.component';

@NgModule({
  exports: [
    SuiSelectComponent
  ],
  imports: [
    CommonModule
  ],
  declarations: [
    SuiSelectComponent
  ]
})
export class SuiSelectModule {

}
