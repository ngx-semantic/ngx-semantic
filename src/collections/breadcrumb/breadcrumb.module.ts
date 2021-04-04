/**
 * Created by bolor on 5/26/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiBreadcrumbDividerDirective} from './breadcrumb-divider.directive';
import {SuiBreadcrumbSectionDirective} from './breadcrumb-section.directive';
import {SuiBreadcrumbDirective} from './breadcrumb.directive';

@NgModule({
  declarations: [SuiBreadcrumbDividerDirective, SuiBreadcrumbSectionDirective, SuiBreadcrumbDirective],
  imports: [CommonModule],
  exports: [SuiBreadcrumbDividerDirective, SuiBreadcrumbSectionDirective, SuiBreadcrumbDirective],
})
export class SuiBreadcrumbModule {
}
