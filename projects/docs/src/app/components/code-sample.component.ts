import {AfterViewInit, Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'doc-code-sample',
  template: `
    <div class="toggle-row">
      <i sui-icon
         suiIconType="code"
         title="Toggle Code"
         style="cursor: pointer"
         (click)="toggleCodeDisplay()"></i>
    </div>

    <ng-content></ng-content>

    <div sui-segment
         suiAttached="top attached"
         style="padding-top: 3rem;">
      <ng-container *ngTemplateOutlet="content"></ng-container>
      <div sui-label
           suiAttached="top">
        Example
        <i sui-icon
           suiIconType="copy"
           title="Copy Code"
           style="cursor: pointer; float: right;"></i>
      </div>
    </div>
    <div class="code-container"
         [class.hidden]="!codeShown"
         [class.visible]="codeShown">
      <div sui-segment
           suiAttached="bottom attached">
        <ngx-prism
          language="html">
          {{code}}
        </ngx-prism>
      </div>
    </div>
  `,
  styles: [`
    .toggle-row {
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 1rem;
    }

    .code-container {
      margin-top: -1px;
    }

    .code-container.hidden {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .code-container.visible {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.6s ease-in-out;
    }
  `]
})
export class CodeSampleComponent {
  @Input() content: TemplateRef<any>;
  @Input() code: string;

  codeShown = false;

  toggleCodeDisplay(): void {
    this.codeShown = !this.codeShown;
  }
}
