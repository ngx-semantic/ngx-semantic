import {NgModule} from '@angular/core';
import {SuiButtonModule} from './elements/button';
import {SuiDividerModule} from './elements/divider';
import {SuiIconModule} from './elements/icon';
import {SuiHeaderModule} from './elements/header';
import {SuiImageModule} from './elements/image';
import {SuiInputModule} from './elements/input';
import {SuiLabelModule} from './elements/label';
import {SuiListModule} from './elements/list';
import {SuiLoaderModule} from './elements/loader';
import {SuiPlaceholderModule} from './elements/placeholder';
import {SuiRailModule} from './elements/rail';
import {SuiRevealModule} from './elements/reveal';
import {SuiSegmentModule} from './elements/segment';
import {SuiFlagModule} from './elements/flag';
import {SuiBreadcrumbModule} from './collections/breadcrumb';
import {SuiFormModule} from './collections/form';
import {SuiGridModule} from './collections/grid';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    SuiButtonModule,
    SuiDividerModule,
    SuiFlagModule,
    SuiHeaderModule,
    SuiIconModule,
    SuiImageModule,
    SuiInputModule,
    SuiLabelModule,
    SuiListModule,
    SuiLoaderModule,
    SuiPlaceholderModule,
    SuiRailModule,
    SuiRevealModule,
    SuiSegmentModule,
    SuiBreadcrumbModule,
    SuiFormModule,
    SuiGridModule
  ]
})
export class NgxSemanticModule {
}
