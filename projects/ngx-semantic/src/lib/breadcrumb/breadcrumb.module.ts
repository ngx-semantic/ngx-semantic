/**
 * Created by bolor on 5/26/2020
 */

import {NgModule} from '@angular/core';
import {SuiBreadcrumbDividerDirective} from './breadcrumb-divider.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SuiBreadcrumbDividerDirective],
  imports: [CommonModule],
  exports: [SuiBreadcrumbDividerDirective]
})
export class SuiBreadcrumbModule {
}
