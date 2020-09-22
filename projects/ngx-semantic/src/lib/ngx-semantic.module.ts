import {NgModule} from '@angular/core';
import {SuiButtonModule} from './elements/button';
import {SuiDividerModule} from './elements/divider';
import {SuiFlagModule} from './elements/flag';
import {SuiHeaderModule} from './elements/header';
import {SuiIconModule} from './elements/icon';
import {SuiImageModule} from './elements/image';
import {SuiInputModule} from './elements/input';
import {SuiLabelModule} from './elements/label';
import {SuiListModule} from './elements/list';
import {SuiLoaderModule} from './elements/loader';
import {SuiPlaceholderModule} from './elements/placeholder';
import {SuiRailModule} from './elements/rail';
import {SuiRevealModule} from './elements/reveal';
import {SuiSegmentModule} from './elements/segment';
import {SuiBreadcrumbModule} from './collections/breadcrumb';
import {SuiFormModule} from './collections/form';
import {SuiGridModule} from './collections/grid';
import {SuiMenuModule} from './collections/menu';
import {SuiMessageModule} from './collections/message';
import {SuiAdvertisementModule} from './views/advertisement';
import {SuiStatisticModule} from './views/statistics';
import {SuiCommentModule} from './views/comment';
import {SuiItemsModule} from './views/items';
import {SuiCardModule} from './views/card';
import {SuiStepsModule} from './elements/steps';
import {SuiContainerModule} from './elements/container';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    SuiFlagModule,
    SuiIconModule,
    SuiListModule,
    SuiRailModule,
    SuiGridModule,
    SuiFormModule,
    SuiMenuModule,
    SuiCardModule,
    SuiImageModule,
    SuiInputModule,
    SuiItemsModule,
    SuiLabelModule,
    SuiStepsModule,
    SuiLoaderModule,
    SuiHeaderModule,
    SuiButtonModule,
    SuiRevealModule,
    SuiMessageModule,
    SuiDividerModule,
    SuiCommentModule,
    SuiSegmentModule,
    SuiStatisticModule,
    SuiContainerModule,
    SuiBreadcrumbModule,
    SuiPlaceholderModule,
    SuiAdvertisementModule
  ]
})
export class NgxSemanticModule {
}
