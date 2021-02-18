import {Component} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent  {
  bubbles9 = 'url(assets/bg/bubbles2.png)';

  constructor() {
  }

  scroll(id): void {
    try {
      const el = document.getElementById(id);
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (err) {
    }
  }
}

