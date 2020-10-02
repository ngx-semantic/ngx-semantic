import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'doc-code-sample',
  template: `
    <div class="toggle-row">
      <i sui-icon
         suiIconType="code"
         title="Toggle Code"
         style="cursor: pointer"></i>
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
    <div sui-segment
         suiAttached="bottom attached">
      <div>code content</div>
    </div>
  `,
  styles: [`
    .toggle-row {
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 1rem;
    }
  `]
})
export class CodeSampleComponent {
  @Input() content: TemplateRef<any>;
}
