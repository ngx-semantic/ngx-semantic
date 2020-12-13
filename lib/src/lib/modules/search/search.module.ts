import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiSearchComponent} from './search.component';

@NgModule({
  declarations: [
    SuiSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuiSearchComponent
  ]
})
export class SuiSearchModule {
}
