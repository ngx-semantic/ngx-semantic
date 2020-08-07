import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.scss']
})
export class LoadersComponent implements OnInit {
  snippetStdLoader = ' <div sui-loader suiSize="medium" suiText="false"></div>';

  snippetTextLoader = ' <div sui-loader suiSize="medium" suiText="true">Loading</div>';

  snippetSizedLoaders = `
  <div sui-loader suiSize="mini" suiText="true">Loading</div>
  <div sui-loader suiSize="tiny" suiText="true">Loading</div>
  <div sui-loader suiSize="small" suiText="true">Loading</div>
  <div sui-loader suiSize="medium" suiText="true">Loading</div>
  <div sui-loader suiSize="large" suiText="true">Loading</div>
  <div sui-loader suiSize="big" suiText="true">Loading</div>
  <div sui-loader suiSize="huge" suiText="true">Loading</div>`;

  constructor() { }
  toggleStateMap: any = {};

  ngOnInit(): void {
  }

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }

}
