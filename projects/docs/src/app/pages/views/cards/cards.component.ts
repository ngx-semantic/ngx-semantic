import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'doc-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  snippetSimpleCard = `
   <div sui-card
       suiColour="green">
    <div class="image">
      <img src="https://semantic-ui.com/images/avatar2/large/kristy.png">
    </div>
    <div class="content">
      <a class="header">Kristy</a>
      <div class="meta">
        <span class="date">Joined in 2013</span>
      </div>
      <div class="description">
        Kristy is an art director living in New York.
      </div>
    </div>
    <div class="extra content">
      <a>
        <i class="user icon"></i>
        22 Friends
      </a>
    </div>
  </div>
  `;

  constructor(title: Title) {
    title.setTitle('Cards | NgxSemantic');
  }
}
