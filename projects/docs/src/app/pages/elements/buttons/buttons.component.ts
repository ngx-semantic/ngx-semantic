import {Component, OnInit} from '@angular/core';
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

  snippetBtnFocusable = `
  <button sui-button>
    Button
  </button>
  <button sui-button
    tabindex="0">
    Focusable
  </button>`;

  snippetBtnEmphasis = `
  <button sui-button suiEmphasis="primary">
    Save
  </button>

  <button sui-button>
    Discard
  </button>`;

  snippetBtnSecondaryEmphasis = `
  <button sui-button suiEmphasis="secondary">
    Save
  </button>

  <button sui-button>
    Discard
  </button>`;

  snippetBtnAnimated = `
  <div sui-button
     tabindex="0"
     suiAnimated="animated">
    <div class="visible content">Next</div>
    <div class="hidden content">
      <i sui-icon
         suiIconType="right arrow"></i>
    </div>
  </div>
  <div sui-button
       tabindex="0"
       suiAnimated="vertical animated">
    <div class="hidden content">Shop</div>
    <div class="visible content">
      <i class="shop icon"></i>
    </div>
  </div>
  <div sui-button
       tabindex="0"
       suiAnimated="animated fade">
    <div class="visible content">Sign-up for a Pro account</div>
    <div class="hidden content">
      $12.99 a month
    </div>
  </div>`;

  snippetBtnLabeled = `
  <div sui-button
       tabindex="0"
       suiLabeled="labeled">
    <div sui-button>
      <i sui-icon
         suiIconType="heart"></i> Like
    </div>
    <a sui-label
       suiBasic="true">
      2,048
    </a>
  </div>
  <div sui-button
       suiLabeled="left labeled"
       tabindex="0">
    <a sui-label
       suiBasic="true"
       suiPointing="right">
      2,048
    </a>
    <div sui-button>
      <i sui-icon
         suiIconType="heart"></i> Like
    </div>
  </div>
  <div class="ui left labeled button" tabindex="0">
    <a sui-label
       suiBasic="true">
      1,048
    </a>
    <div sui-button
         suiIcon="true">
      <i sui-icon
         suiIconType="fork"></i>
    </div>
  </div>`;

  snippetBtnColorLabeled = `
  <div sui-button
       suiLabeled="labeled"
       tabindex="0">
    <div sui-button
         suiColour="red">
      <i sui-icon
         suiIconType="heart"></i> Like
    </div>
    <a sui-label
       suiColour="red"
       suiBasic="true"
       suiPointing="left">
      1,048
    </a>
  </div>
  <div sui-button
       suiLabeled="labeled"
       tabindex="0">
    <div sui-button
         suiBasic="true"
         suiColour="blue">
      <i sui-icon
         suiIconType="fork"></i> Fork
    </div>
    <a sui-label
       suiColour="blue"
       suiBasic="true"
       suiPointing="left">
      1,048
    </a>
  </div>`;

  snippetBtnIcon = `
   <button sui-button
          suiIcon="true">
    <i sui-icon
       suiIconType="cloud"></i>
  </button>`;

  snippetBtnLabeledIcon = `
 <button sui-button
          suiIcon="true"
          suiLabeled="labeled">
    <i sui-icon
       suiIconType="pause"></i>
    Pause
  </button>
  <button sui-button
          suiIcon="true"
          suiLabeled="right labeled">
    <i sui-icon
       suiIconType="right arrow"></i>
    Next
  </button>`;

  snippetBtnBasic = `
   <button sui-button
          suiBasic="true">
    <i sui-icon
       suiIconType="user"></i>
    Add Friend
  </button>`;

  snippetBtnBasicEmphasis = `
   <button sui-button
          suiBasic="true"
          suiEmphasis="primary">
    Primary
  </button>
  <button sui-button
          suiBasic="true"
          suiEmphasis="secondary">
    Secondary
  </button>
  <button sui-button
          suiBasic="true"
          suiEmphasis="positive">
    Positive
  </button>
  <button sui-button
          suiBasic="true"
          suiEmphasis="negative">
    Negative
  </button>`;

  snippetBtnBasicColours = `
   <button sui-button
          suiBasic="true"
          suiColour="red">
    Red
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="orange">
    Orange
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="yellow">
    Yellow
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="olive">
    Olive
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="green">
    Green
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="teal">
    Teal
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="blue">
    Blue
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="violet">
    Violet
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="purple">
    Purple
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="pink">
    Pink
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="brown">
    Brown
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="grey">
    Grey
  </button>
  <button sui-button
          suiBasic="true"
          suiColour="black">
    Black
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

  ngOnInit(): void {
  }

  toggleLabel(key: string) {
    this.toggleStateMap[key] = !this.toggleStateMap[key];
  }

}
