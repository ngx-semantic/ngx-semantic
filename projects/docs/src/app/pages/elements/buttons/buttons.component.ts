import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  show: boolean = false;
  toggleStateMap: any = {};
  constructor() {}

  ngOnInit(): void {}

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }
}
