import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  show: boolean = false;

  toggleLabel() {
    this.show = !this.show;
  }
  constructor() {}

  ngOnInit(): void {}
}
