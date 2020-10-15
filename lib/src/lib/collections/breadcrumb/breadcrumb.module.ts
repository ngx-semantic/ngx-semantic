/**
 * Created by bolor on 5/26/2020
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuiBreadcrumbDividerDirective} from './breadcrumb-divider.directive';
import {SuiBreadcrumbSectionDirective} from './breadcrumb-section.directive';
import {SuiBreadcrumbComponent} from './breadcrumb.component';

@NgModule({
  declarations: [SuiBreadcrumbDividerDirective, SuiBreadcrumbSectionDirective, SuiBreadcrumbComponent],
  imports: [CommonModule],
  exports: [SuiBreadcrumbDividerDirective, SuiBreadcrumbSectionDirective, SuiBreadcrumbComponent],
})
export class SuiBreadcrumbModule {
}
