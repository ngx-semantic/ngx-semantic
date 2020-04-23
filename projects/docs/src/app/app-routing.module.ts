import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ElementsComponent} from './pages/elements/elements.component';
import {ButtonsComponent} from './pages/elements/buttons/buttons.component';
import {HomeComponent} from './pages/home/home.component';
import {DividerComponent} from './pages/elements/divider/divider.component';
import {FlagsComponent} from './pages/elements/flags/flags.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'elements',
    component: ElementsComponent,
    children: [
      {
        path: 'buttons',
        component: ButtonsComponent
      },
      {
        path: 'dividers',
        component: DividerComponent
      },
      {
        path: 'flags',
        component: FlagsComponent
      }
    ]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
