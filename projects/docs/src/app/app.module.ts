import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSemanticModule} from 'ngx-semantic';
import {HomeComponent} from './pages/home/home.component';
import {ButtonsComponent} from './pages/elements/buttons/buttons.component';
import {ElementsComponent} from './pages/elements/elements.component';
import {FlagsComponent} from './pages/elements/flags/flags.component';
import {DividerComponent} from './pages/elements/divider/divider.component';
import {HeadersComponent} from './pages/elements/headers/headers.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    ElementsComponent,
    HomeComponent,
    DividerComponent,
    FlagsComponent,
    HeadersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSemanticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
