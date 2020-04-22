import {NgModule} from '@angular/core';
import {SuiButtonModule} from './button';

export * from './button';
export * from './common';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    SuiButtonModule
  ]
})
export class NgxSemanticModule {
}
