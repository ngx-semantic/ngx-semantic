import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ElementsComponent} from './elements/elements.component';
import {ButtonsComponent} from './elements/buttons/buttons.component';

const routes: Routes = [
  {
    path: 'elements',
    component: ElementsComponent,
    children: [
      {
        path: 'buttons',
        component: ButtonsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
