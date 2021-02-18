import {Component, OnInit} from '@angular/core';
import {VgApiService} from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {
  bubbles4 = 'assets/bg/bubbles2.png';
  bubbles5 = 'assets/bg/bubbles3.png';
  hero: string;
  bgImage: string;
  bgImageDefault = ' url(' + this.bubbles4 + ')';
  api: VgApiService;

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
    const elementById = document.getElementById('animationGIF');
    elementById.setAttribute('style', 'background-image:' + this.bgImage);
  }

  // tslint:disable-next-line:typedef
  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.playVideo.bind(this)
    );
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      this.playVideo.bind(this)
    );
  }
  // tslint:disable-next-line:typedef
  playVideo() {
    this.api.play();
  }
}


