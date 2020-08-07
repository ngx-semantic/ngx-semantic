import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  stdDivider = `
  <div>
    <p> Some content here ...</p>
  </div>

  <div sui-divider></div>

  <div>
    <p> Some content here ...</p>
  </div>`;

  verticalDivider = `
  <div sui-segment>
    <div class="ui two column very relaxed grid">
      <div class="column">
        <div>
          <p> Some content ...</p>
        </div>
        <div>
          <p> Some content ...</p>
        </div>
      </div>

      <div class="column">
        <div>
          <p> Some content ...</p>
        </div>
        <div>
          <p> Some content ...</p>
        </div>
      </div>
    </div>
    <div sui-divider suiDirection="vertical">
      and
    </div>
  </div>
      `;

  horizontalDivider = `
  <div sui-segment suiTextAlignment="center aligned" suiBasic="true">
    <div sui-input suiAction="left action" suiIcon="true">
      <input type="text" placeholder="Order #">
      <div sui-button suiColour="blue">
        Search
      </div>
    </div>

    <div sui-divider suiDirection="horizontal">
        Or
    </div>

    <div class="ui teal labeled icon button">
      Create New Order
      <i class="add icon"></i>
    </div>
  </div>
  `;

  constructor() { }

  toggleStateMap: any = {};

  ngOnInit(): void {
  }

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }

}
