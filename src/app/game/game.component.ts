
import { Component, OnInit } from '@angular/core';
import {Tile} from '../home/home.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  bubbles7 = 'assets/bg/bubbles7.png';
  bubbles8 = 'assets/bg/bubbles11.png';
  bubbles9 = 'url(assets/bg/bubbles2.png)';
  bubbles10 = 'url(assets/bg/bubbles10.png)';
  bubbles11 = 'assets/bg/bubbles10.png';

  tiles: Tile[] = [
    {cols: 4, rows: 3, color: 'black', bg: ' url(' + this.bubbles9 + ')', class: ''},
    // {cols: 2, rows: 3, color: 'black', bg: ' url(' + this.bubbles7 + ')', class: 'tile'},
    // {cols: 2, rows: 3, color: 'black', bg: ' url(' + this.bubbles8 + ')', class: 'tile'},
    // {cols: 2, rows: 3, color: 'black', bg: ' url(' + this.bubbles10 + ')', class: 'tile3'},
    // {cols: 2, rows: 3, color: 'black', bg: ' url(' + this.bubbles11 + ')', class: 'tile'},

  ];

  constructor() { }

  ngOnInit(): void {
  }



  scroll(id): void {
    try {
      const el = document.getElementById(id);
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (err) {
    }
  }
}

