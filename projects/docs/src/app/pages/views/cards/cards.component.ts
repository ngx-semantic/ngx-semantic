import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'doc-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  constructor(title: Title) {
    title.setTitle('Cards | NgxSemantic');
  }
}
