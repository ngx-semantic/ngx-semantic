import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  show: boolean = false;

  toggleLabel() {
    this.show = !this.show;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
