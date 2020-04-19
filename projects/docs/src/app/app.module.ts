import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSemanticModule} from 'ngx-semantic';
import { ButtonComponent } from './pages/button/button.component';
import { ButtonsComponent } from './elements/buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ButtonsComponent
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
