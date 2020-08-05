import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  snippetColored = `
  <a sui-label suiColour="red">Red</a>
  <a sui-label suiColour="orange">Orange</a>
  <a sui-label suiColour="yellow">Yellow</a>
  <a sui-label suiColour="olive">Olive</a>
  `;

  snippetCircular = `
  <a sui-label suiColour="red" suiCircular="true">2</a>
  <a sui-label suiColour="orange" suiCircular="true">2</a>
  <a sui-label suiColour="yellow" suiCircular="true">2</a>
  <a sui-label suiColour="olive" suiCircular="true">2</a>
  `;

  constructor() { }
  toggleStateMap: any = {};

  ngOnInit(): void {
  }

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }

}
