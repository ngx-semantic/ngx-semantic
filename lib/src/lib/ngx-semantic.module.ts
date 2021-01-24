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
import {SuiDimmerModule} from './modules/dimmer';
import {SuiDropdownModule} from './modules/dropdown';
import {SuiEmbedModule} from './modules/embed';
import {SuiModalModule} from './modules/modal';
import {SuiPopupModule} from './modules/popup';
import {SuiProgressModule} from './modules/progress';
import {SuiRatingModule} from './modules/rating';
import {SuiSearchModule} from './modules/search';
import {SuiSelectModule} from './modules/select';
import {SuiSidebarModule} from './modules/sidebar';
import {SuiTabsModule} from './modules/tabs';
import {SuiAdvertisementModule} from './views/advertisement';
import {SuiCardModule} from './views/card';
import {SuiCommentModule} from './views/comment';
import {SuiItemsModule} from './views/items';
import {SuiStatisticModule} from './views/statistics';

@NgModule({
  declarations: [],
  exports: [
    SuiTabsModule,
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
    SuiPopupModule,
    SuiEmbedModule,
    SuiModalModule,
    SuiLoaderModule,
    SuiDimmerModule,
    SuiHeaderModule,
    SuiButtonModule,
    SuiRevealModule,
    SuiRatingModule,
    SuiSelectModule,
    SuiSearchModule,
    SuiMessageModule,
    SuiDividerModule,
    SuiCommentModule,
    SuiSegmentModule,
    SuiSidebarModule,
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
