import {Component} from '@angular/core';

@Component({
  selector: 'doc-code-sample',
  template: `
    <div>
      <i sui-icon
         [suiIconType]="code"></i>
    </div>

    <ng-content></ng-content>
    <div>code sample</div>
  `
})
export class CodeSampleComponent {

}
