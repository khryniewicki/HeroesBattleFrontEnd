import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  bubbles4 = 'assets/bg/bubbles4.png';
  bubbles5 = 'assets/bg/bubbles5.png';
  hero: string;
  bgImage: string;
  bgImageDefault = ' url(' + this.bubbles4 + ')';

  private getBubbleBg(hero: string): string {
    switch (hero) {
      case 'fire_wizard':
        return this.bubbles4;
      case 'ice_wizard':
        return this.bubbles4;
      case 'thunder_wizard':
        return this.bubbles4;
      case 'fallen_king':
        return this.bubbles5;
      case 'fallen_monk':
        return this.bubbles5;
      case 'fallen_witcher':
        return this.bubbles5;
      default:
        return this.bubbles4;
    }
  }

  ngOnInit(): void {
    this.bgImage = ' url(' + this.getBubbleBg(this.hero) + ')';
    const elementById = document.getElementById('tile_3');
    elementById.setAttribute('style', 'background-image:' + this.bgImage);
  }
}


