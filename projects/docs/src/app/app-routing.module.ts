import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ElementsComponent} from './pages/elements/elements.component';
import {ButtonsComponent} from './pages/elements/buttons/buttons.component';
import {HomeComponent} from './pages/home/home.component';
import {DividerComponent} from './pages/elements/divider/divider.component';
import {FlagsComponent} from './pages/elements/flags/flags.component';
import {HeadersComponent} from './pages/elements/headers/headers.component';
import {IconsComponent} from './pages/elements/icons/icons.component';
import {InputsComponent} from './pages/elements/inputs/inputs.component';
import {LabelsComponent} from './pages/elements/labels/labels.component';
import {ListsComponent} from './pages/elements/lists/lists.component';
import {LoadersComponent} from './pages/elements/loaders/loaders.component';
import {PlaceholdersComponent} from './pages/elements/placeholders/placeholders.component';
import {RailsComponent} from './pages/elements/rails/rails.component';
import {RevealsComponent} from './pages/elements/reveals/reveals.component';
import {SegmentsComponent} from './pages/elements/segments/segments.component';
import {CollectionsComponent} from './pages/collections/collections.component';
import {MessagesComponent} from './pages/collections/messages/messages.component';
import {ViewsComponent} from './pages/views/views.component';
import {CardsComponent} from './pages/views/cards/cards.component';
import {StepsComponent} from './pages/elements/steps/steps.component';

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
      },
      {
        path: 'headers',
        component: HeadersComponent
      },
      {
        path: 'icons',
        component: IconsComponent
      },
      {
        path: 'inputs',
        component: InputsComponent
      },
      {
        path: 'labels',
        component: LabelsComponent
      },
      {
        path: 'lists',
        component: ListsComponent
      },
      {
        path: 'loaders',
        component: LoadersComponent
      },
      {
        path: 'placeholders',
        component: PlaceholdersComponent
      },
      {
        path: 'rails',
        component: RailsComponent
      },
      {
        path: 'reveals',
        component: RevealsComponent
      },
      {
        path: 'segments',
        component: SegmentsComponent
      },
      {
        path: 'steps',
        component: StepsComponent
      }
    ]
  },
  {
    path: 'collections',
    component: CollectionsComponent,
    children: [
      {
        path: 'messages',
        component: MessagesComponent
      }
    ]
  },
  {
    path: 'views',
    component: ViewsComponent,
    children: [
      {
        path: 'cards',
        component: CardsComponent
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
