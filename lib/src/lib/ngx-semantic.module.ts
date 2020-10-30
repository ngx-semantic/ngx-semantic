import {NgModule} from '@angular/core';
import {SuiBreadcrumbModule} from './collections/breadcrumb';
import {SuiFormModule} from './collections/form';
import {SuiGridModule} from './collections/grid';
import {SuiMenuModule} from './collections/menu';
import {SuiMessageModule} from './collections/message';
import {SuiTableModule} from './collections/table';
import {SuiButtonModule} from './elements/button';
import {SuiContainerModule} from './elements/container';
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
import {SuiStepsModule} from './elements/steps';
import {SuiCheckboxModule} from './modules/checkbox';
import {SuiDropdownModule} from './modules/dropdown';
import {SuiProgressModule} from './modules/progress';
import {SuiRatingModule} from './modules/rating';
import {SuiAdvertisementModule} from './views/advertisement';
import {SuiCardModule} from './views/card';
import {SuiCommentModule} from './views/comment';
import {SuiItemsModule} from './views/items';
import {SuiStatisticModule} from './views/statistics';

@NgModule({
  declarations: [],
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
    SuiTableModule,
    SuiLoaderModule,
    SuiHeaderModule,
    SuiButtonModule,
    SuiRevealModule,
    SuiRatingModule,
    SuiMessageModule,
    SuiDividerModule,
    SuiCommentModule,
    SuiSegmentModule,
    SuiProgressModule,
    SuiDropdownModule,
    SuiCheckboxModule,
    SuiStatisticModule,
    SuiContainerModule,
    SuiBreadcrumbModule,
    SuiPlaceholderModule,
    SuiAdvertisementModule
  ],
  imports: []
})
export class NgxSemanticModule {
}
