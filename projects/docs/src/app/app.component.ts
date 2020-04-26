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
