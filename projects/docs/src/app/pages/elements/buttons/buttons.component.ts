import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'doc-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  snippetBtn = `
  <button sui-button>
    Follow
  </button>`;

  snippetBtnEmphasis = `
  <button sui-button suiEmphasis="primary">
    Save
  </button>

  <button sui-button>
    Discard
  </button>`;

  snippetBtnBasic = `
  <button sui-button suiBasic="true" suiColour="red" suiSize="medium">
    Red
  </button>

  <button sui-button suiBasic="true" suiColour="blue" suiSize="medium">
    Blue
  </button>`;

  snippetBtnHorizontal = `
  <div sui-button-group>
    <button sui-button suiEmphasis="primary">
      Left
    </button>

    <button sui-button suiEmphasis="secondary">
      Right
    </button>
  </div>`;

  snippetBtnVertical = `
  <div sui-button-group suiVertical="true">
    <button sui-button suiEmphasis="positive">
      Top
    </button>

    <button sui-button suiEmphasis="negative">
      Bottom
    </button>
  </div>`;

  snippetBtnSocial = `
  <div sui-button suiSocial="facebook">
    <i class="facebook icon"></i>
    Facebook
  </div>

  <div sui-button suiSocial="twitter">
    <i class="twitter icon"></i>
    Twitter
  </div>`;

  constructor(title: Title) {
    title.setTitle('Buttons | NgxSemantic');
  }

  toggleStateMap: any = {};

  ngOnInit(): void {}

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }

}
