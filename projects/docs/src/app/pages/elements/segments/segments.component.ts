import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss'],
})
export class SegmentsComponent implements OnInit {
  snippetSegment = `
  <div sui-segment suiColour="red" [suiInverted]="true">Red</div>
  <div sui-segment suiColour="orange" [suiInverted]="true">Orange</div>
  <div sui-segment suiColour="yellow" [suiInverted]="true">Yellow</div>
  <div sui-segment suiColour="olive" [suiInverted]="true">Olive</div>
  <div sui-segment suiColour="green" [suiInverted]="true">Green</div>`;

  constructor() {}
  toggleStateMap: any = {};

  ngOnInit(): void {}

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }
}
