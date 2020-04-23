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
          <a class="item" routerLink="elements/buttons">
            Buttons
          </a>
          <a class="item" routerLink="elements/dividers">
            Dividers
          </a>
          <a class="item" routerLink="elements/flags">
            Flags
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
