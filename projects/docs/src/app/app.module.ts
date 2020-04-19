import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSemanticModule} from 'ngx-semantic';
import {HomeComponent} from './pages/home/home.component';
import {ButtonsComponent} from './pages/elements/buttons/buttons.component';
import {ElementsComponent} from './pages/elements/elements.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    ElementsComponent,
    HomeComponent
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
