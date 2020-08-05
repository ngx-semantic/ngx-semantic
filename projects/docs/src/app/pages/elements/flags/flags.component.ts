import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent implements OnInit {
  snippetFlag = `
    <i class="uae" sui-flag></i>
    <i class="burkina faso" sui-flag></i>
    <i class="czech republic" sui-flag></i>
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
