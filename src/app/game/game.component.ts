import {Component, OnInit} from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 2, color: 'black'},
    {text: 'Two', cols: 3, rows: 1, color: 'black'},
    {text: 'Three', cols: 1, rows: 2, color: 'black'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Five', cols: 1, rows: 1, color: '#3700B3'},

  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
