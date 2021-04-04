import {NgModule} from '@angular/core';

import {SuiTabsModule} from 'ngx-semantic/modules/tabs';
import {SuiFlagModule} from 'ngx-semantic/elements/flag';
import {SuiListModule} from 'ngx-semantic/elements/list';
import {SuiFormModule} from 'ngx-semantic/collections/form';
import {SuiGridModule} from 'ngx-semantic/collections/grid';
import {SuiRailModule} from 'ngx-semantic/elements/rail';
import {SuiIconModule} from 'ngx-semantic/elements/icon';
import {SuiMenuModule} from 'ngx-semantic/collections/menu';
import {SuiCardModule} from 'ngx-semantic/views/card';
import {SuiImageModule} from 'ngx-semantic/elements/image';
import {SuiInputModule} from 'ngx-semantic/elements/input';
import {SuiItemsModule} from 'ngx-semantic/views/items';
import {SuiLabelModule} from 'ngx-semantic/elements/label';
import {SuiStepsModule} from 'ngx-semantic/elements/steps';
import {SuiTableModule} from 'ngx-semantic/collections/table';
import {SuiPopupModule} from 'ngx-semantic/modules/popup';
import {SuiEmbedModule} from 'ngx-semantic/modules/embed';
import {SuiModalModule} from 'ngx-semantic/modules/modal';
import {SuiLoaderModule} from 'ngx-semantic/elements/loader';
import {SuiDimmerModule} from 'ngx-semantic/modules/dimmer';
import {SuiHeaderModule} from 'ngx-semantic/elements/header';
import {SuiButtonModule} from 'ngx-semantic/elements/button';
import {SuiRevealModule} from 'ngx-semantic/elements/reveal';
import {SuiRatingModule} from 'ngx-semantic/modules/rating';
import {SuiSelectModule} from 'ngx-semantic/modules/select';
import {SuiSearchModule} from 'ngx-semantic/modules/search';
import {SuiMessageModule} from 'ngx-semantic/collections/message';
import {SuiDividerModule} from 'ngx-semantic/elements/divider';
import {SuiCommentModule} from 'ngx-semantic/views/comment';
import {SuiSegmentModule} from 'ngx-semantic/elements/segment';
import {SuiSidebarModule} from 'ngx-semantic/modules/sidebar';
import {SuiProgressModule} from 'ngx-semantic/modules/progress';
import {SuiDropdownModule} from 'ngx-semantic/modules/dropdown';
import {SuiCheckboxModule} from 'ngx-semantic/modules/checkbox';
import {SuiStatisticModule} from 'ngx-semantic/views/statistics';
import {SuiAccordionModule} from 'ngx-semantic/modules/accordion';
import {SuiContainerModule} from 'ngx-semantic/elements/container';
import {SuiBreadcrumbModule} from 'ngx-semantic/collections/breadcrumb';
import {SuiPlaceholderModule} from 'ngx-semantic/elements/placeholder';
import {SuiAdvertisementModule} from 'ngx-semantic/views/advertisement';

export * from 'ngx-semantic/elements/button';
export * from 'ngx-semantic/elements/container';
export * from 'ngx-semantic/elements/divider';
export * from 'ngx-semantic/elements/flag';
export * from 'ngx-semantic/elements/header';
export * from 'ngx-semantic/elements/icon';
export * from 'ngx-semantic/elements/input';
export * from 'ngx-semantic/elements/label';
export * from 'ngx-semantic/elements/list';
export * from 'ngx-semantic/elements/loader';
export * from 'ngx-semantic/elements/placeholder';
export * from 'ngx-semantic/elements/rail';
export * from 'ngx-semantic/elements/reveal';
export * from 'ngx-semantic/elements/segment';
export * from 'ngx-semantic/elements/steps';

export * from 'ngx-semantic/collections/breadcrumb';
export * from 'ngx-semantic/collections/form';
export * from 'ngx-semantic/collections/grid';
export * from 'ngx-semantic/collections/menu';
export * from 'ngx-semantic/collections/message';
export * from 'ngx-semantic/collections/table';

export * from 'ngx-semantic/views/card';
export * from 'ngx-semantic/views/comment';
export * from 'ngx-semantic/views/feed';
export * from 'ngx-semantic/views/items';
export * from 'ngx-semantic/views/statistics';
export * from 'ngx-semantic/views/advertisement';

export * from 'ngx-semantic/modules/accordion';
export * from 'ngx-semantic/modules/checkbox';
export * from 'ngx-semantic/modules/dimmer';
export * from 'ngx-semantic/modules/dropdown';
export * from 'ngx-semantic/modules/embed';
export * from 'ngx-semantic/modules/modal';
export * from 'ngx-semantic/modules/rating';
export * from 'ngx-semantic/modules/search';
export * from 'ngx-semantic/modules/select';
export * from 'ngx-semantic/modules/sidebar';
export * from 'ngx-semantic/modules/popup';
export * from 'ngx-semantic/modules/progress';
export * from 'ngx-semantic/modules/tabs';

export * from 'ngx-semantic/core/util';
export * from 'ngx-semantic/core/enums';
export * from 'ngx-semantic/core/types';

@NgModule({
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
    SuiAccordionModule,
    SuiContainerModule,
    SuiBreadcrumbModule,
    SuiPlaceholderModule,
    SuiAdvertisementModule
  ]
})
export class NgxSemanticModule {
}
