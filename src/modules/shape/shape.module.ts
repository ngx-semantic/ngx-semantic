import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuiShapeComponent} from './shape.component';
import {SuiShapeSideComponent} from './shape-side.component';

@NgModule({
  imports: [CommonModule, SuiShapeComponent, SuiShapeSideComponent],
  exports: [SuiShapeComponent, SuiShapeSideComponent]
})
export class SuiShapeModule {}
