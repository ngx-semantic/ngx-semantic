import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  snippetColored = `
  <div class="ui segment">
    <h4 sui-header suiColour="red" suiInverted="true">Red</h4>
    <h4 sui-header suiColour="orange" suiInverted="true">Orange</h4>
    <h4 sui-header suiColour="yellow" suiInverted="true">Yellow</h4>
    <h4 sui-header suiColour="olive" suiInverted="true">Olive</h4>
  </div>
  `;
  snippetInverted = `
  <div class="ui inverted segment">
    <h4 sui-header suiColour="teal" suiInverted="true">Teal</h4>
    <h4 sui-header suiColour="blue" suiInverted="true">Blue</h4>
    <h4 sui-header suiColour="purple" suiInverted="true">Purple</h4>
    <h4 sui-header suiColour="violet" suiInverted="true">Violet</h4>
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
