/**
 * Created by bolor on 5/26/2020
 */

import {NgModule} from '@angular/core';
import {SuiBreadcrumbDividerDirective} from './breadcrumb-divider.directive';
import {CommonModule} from '@angular/common';
import {SuiBreadcrumbSectionDirective} from './breadcrumb-section.directive';

@NgModule({
  declarations: [SuiBreadcrumbDividerDirective, SuiBreadcrumbSectionDirective],
  imports: [CommonModule],
  exports: [SuiBreadcrumbDividerDirective, SuiBreadcrumbSectionDirective]
})
export class SuiBreadcrumbModule {
}
