import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiIconModule} from 'ngx-semantic/elements/icon';
import {SuiInputModule} from 'ngx-semantic/elements/input';
import {SuiSearchComponent} from './search.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SuiSearchComponent
  ],
  imports: [
    CommonModule,
    SuiIconModule,
    SuiInputModule,
    FormsModule
  ],
  exports: [
    SuiSearchComponent
  ]
})
export class SuiSearchModule {
}
