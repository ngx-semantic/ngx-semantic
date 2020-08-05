import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-rails',
  templateUrl: './rails.component.html',
  styleUrls: ['./rails.component.scss']
})
export class RailsComponent implements OnInit {
  snippetStdRail = `
  <div sui-rail suiLocation="left" suiDividing="true">
    <div class="ui segment">
      Left Rail Content
    </div>
  </div>
  <div sui-rail suiLocation="right" suiDividing="true">
    <div class="ui segment">
      Right Rail Content
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
