import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';

import {SuiPopupComponent} from './popup.component';
import {SuiPopupDirective} from './popup.directive';

@NgModule({
    declarations: [
        SuiPopupDirective,
        SuiPopupComponent
    ],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        SuiPopupDirective,
        SuiPopupComponent
    ]
})
export class SuiPopupModule {
}
