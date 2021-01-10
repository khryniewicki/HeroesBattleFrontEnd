
import { Component, OnInit } from '@angular/core';
import {Tile} from '../home/home.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  bubbles9 = 'assets/bg/bubbles9.png';
  bubbles7 = 'assets/bg/bubbles7.png';
  bubbles8 = 'assets/bg/bubbles8.png';

  tiles: Tile[] = [
    {cols: 4, rows: 3, color: 'black', bg: ' url(' + this.bubbles9 + ')', class: ''},
    {cols: 2, rows: 2, color: 'black', bg: ' url(' + this.bubbles7 + ')', class: 'tile'},
    {cols: 2, rows: 2, color: 'black', bg: ' url(' + this.bubbles8 + ')', class: 'tile'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

