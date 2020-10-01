import {Component} from '@angular/core';

@Component({
  selector: 'doc-root',
  template: `
    <div class="ui visible sidebar inverted vertical menu">
      <div class="item">
        <div class="header" routerLink="">Getting Started</div>
      </div>
      <div class="item">
        <div class="header">Elements</div>
        <div class="menu">
          <a class="item" routerLink="elements/buttons" routerLinkActive="active">
            Buttons
          </a>
          <a class="item" routerLink="elements/dividers" routerLinkActive="active">
            Dividers
          </a>
          <a class="item" routerLink="elements/flags" routerLinkActive="active">
            Flags
          </a>
          <a class="item" routerLink="elements/headers" routerLinkActive="active">
            Headers
          </a>
          <a class="item" routerLink="elements/icons" routerLinkActive="active">
            Icons
          </a>
          <a class="item" routerLink="elements/inputs" routerLinkActive="active">
            Inputs
          </a>
          <a class="item" routerLink="elements/labels" routerLinkActive="active">
            Labels
          </a>
          <a class="item" routerLink="elements/lists" routerLinkActive="active">
            Lists
          </a>
          <a class="item" routerLink="elements/loaders" routerLinkActive="active">
            Loaders
          </a>
          <a class="item" routerLink="elements/placeholders" routerLinkActive="active">
            Placeholders
          </a>
          <a class="item" routerLink="elements/rails" routerLinkActive="active">
            Rails
          </a>
          <a class="item" routerLink="elements/reveals" routerLinkActive="active">
            Reveals
          </a>
          <a class="item" routerLink="elements/segments" routerLinkActive="active">
            Segments
          </a>
          <a class="item" routerLink="elements/steps" routerLinkActive="active">
            Steps
          </a>
        </div>
      </div>
      <div class="item">
        <div class="header">Collections</div>
        <div class="menu">
          <a class="item" routerLink="collections/messages" routerLinkActive="active">
            Messages
          </a>
        </div>
      </div>
      <div class="item">
        <div class="header">Views</div>
        <div class="menu">
          <a class="item" routerLink="views/cards" routerLinkActive="active">
            Cards
          </a>
        </div>
      </div>
    </div>
    <div class="pusher">
      <div class="page">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .page {
      margin-left: 15rem;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
}
