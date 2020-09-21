import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  snippetBasic = `
    <div sui-message suiColour="blue" suiSize="large">
      <div sui-message-header>
        Welcome back!
      </div>
      <p>A basic message.</p>
    </div>
  `;
  snippetDismissable = `
  <div sui-message [suiDismissable]="true">
    <div sui-message-header>
      Welcome back!
    </div>
    <p>This is a special notification which you can dismiss if you're bored with it.</p>
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
