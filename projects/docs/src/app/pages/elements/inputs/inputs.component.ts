import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'doc-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  snippetInput = `
  <div sui-input>
    <input type="text" placeholder="Search...">
  </div>
  `;

  snippetAction = `
   <div sui-input suiAction="left action">
     <button sui-button suiColour="teal" suiLabeled="labeled" suiIcon="true">
       <i sui-icon suiIconType="cart"></i>
       Checkout
     </button>
     <input type="text" value="$52.03">
   </div>

   <div sui-input suiAction="right action">
     <input type="text" value="http://www.short.url/c0opq">
     <button sui-button suiColour="teal" suiLocation="right" suiLabeled="true" suiIcon="true">
       <i sui-icon suiIconType="copy"></i>
       Copy
     </button>
   </div>
  `;

  constructor() {
  }
  toggleStateMap: any = {};

  ngOnInit(): void {
  }

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }
}
