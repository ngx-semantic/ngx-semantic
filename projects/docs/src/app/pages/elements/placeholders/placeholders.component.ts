import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-placeholders',
  templateUrl: './placeholders.component.html',
  styleUrls: ['./placeholders.component.scss']
})
export class PlaceholdersComponent implements OnInit {
  snippetStdPlaceholder = `
  <div sui-placeholder>
    <div sui-placeholder-image suiHeader="true">
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
    </div>
    <div sui-placeholder-paragraph>
      <div sui-placeholder-line suiLength="medium"></div>
      <div sui-placeholder-line suiLength="short"></div>
    </div>
  </div>
  `;

  snippetHeaderPlaceholder = `
  <div class="ui active placeholder">
    <div sui-placeholder-image suiHeader="true">
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
    </div>
    <div sui-placeholder-paragraph>
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
    </div>
  </div>
  `;

  snippetInvertedPlaceholder = `
  <div class="ui active inverted placeholder">
    <div sui-placeholder-image suiHeader="true">
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
    </div>
    <div sui-placeholder-paragraph>
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
      <div sui-placeholder-line></div>
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
