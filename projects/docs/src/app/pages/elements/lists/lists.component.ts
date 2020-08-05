import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  snippetList = `
    <div  sui-list>
      <div class="item">
        <i sui-icon suiIconType="users"></i>
        <div class="content">
          Semantic UI
        </div>
      </div>
      <div class="item">
        <i sui-icon suiIconType="marker"></i>
        <div class="content">
          New York, NY
        </div>
      </div>
      <div class="item">
        <i sui-icon suiIconType="mail"></i>
        <div class="content">
          <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
        </div>
      </div>
      <div class="item">
        <i sui-icon suiIconType="linkify"></i>
        <div class="content">
          <a href="http://www.semantic-ui.com">semantic-ui.com</a>
        </div>
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
