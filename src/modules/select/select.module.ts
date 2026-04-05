import {NgModule} from '@angular/core';
import {SuiSelectComponent} from './select.component';

@NgModule({
  exports: [
    SuiSelectComponent,
  ],
  imports: [
    SuiSelectComponent
  ]
})
export class SuiSelectModule {
}
