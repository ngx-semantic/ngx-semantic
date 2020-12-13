import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from '../../elements/icon';
import {SuiInputModule} from '../../elements/input';
import {SuiSearchComponent} from './search.component';

@NgModule({
  declarations: [
    SuiSearchComponent
  ],
  imports: [
    CommonModule,
    SuiIconModule,
    SuiInputModule
  ],
  exports: [
    SuiSearchComponent
  ]
})
export class SuiSearchModule {
}
