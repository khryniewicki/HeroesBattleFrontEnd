import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AnimationComponent} from './tiles/animation/animation.component';
import {NavbarComponent} from '../navbar/navbar.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  bg: string;
  class: string;
  id?: string;
}

@Component({
  providers: [NavbarComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class HomeComponent {
  bubbles = 'assets/bg/bubbles1.png';
  bubbles2 = 'assets/bg/bubbles2.png';
  bubbles3 = 'assets/bg/bubbles3.png';
  // tslint:disable-next-line:typedef
  private componentRef: ComponentRef<any>;
  mage: string;
  fallen: string;
  mageAnimationActive: boolean;
  fallenAnimationActive: boolean;

  @ViewChild('parent', {read: ViewContainerRef}) target: ViewContainerRef;

  tiles: Tile[] = [
    {cols: 4, rows: 3, color: 'black', bg: ' url(' + this.bubbles + ')', class: ''},
    {cols: 2, rows: 2, color: 'black', bg: ' url(' + this.bubbles2 + ')', class: 'tile'},
    {cols: 2, rows: 2, color: 'black', bg: ' url(' + this.bubbles3 + ')', class: 'tile'},
  ];

  constructor(private el: ElementRef, private componentFactoryResolver: ComponentFactoryResolver, private navbar: NavbarComponent) {
    this.mage = 'fire_wizard';
    this.fallen = 'fallen_king';
  }


// tslint:disable-next-line:typedef
  edit(value: string) {
    this.mage = value;

    if (this.mageAnimationActive) {
      this.animation_turn_off(1);
      this.destroy_animation();
    }
  }

  // tslint:disable-next-line:typedef
  edit2(value: string) {
    this.fallen = value;
    if (this.fallenAnimationActive) {
      this.animation_turn_off(2);
      this.destroy_animation();
    }
  }

  // tslint:disable-next-line:typedef
  private create_animation(hero: string) {
    const animationComponent = this.componentFactoryResolver.resolveComponentFactory(AnimationComponent);
    this.componentRef = this.target.createComponent(animationComponent);
    this.componentRef.instance.hero = hero;
  }

// tslint:disable-next-line:typedef
  animate(num: number) {
    if (num === 1) {
      if (this.mageAnimationActive) {
        this.animation_turn_off(num);
        this.destroy_animation();
      } else {
        if (this.fallenAnimationActive) {
          this.animation_turn_off(num + 1);
          this.destroy_and_create(this.mage, num);
        } else {
          this.create_animation(this.mage);
          this.animation_turn_on(num);
        }
      }
    } else if (num === 2) {
      if (this.fallenAnimationActive) {
        this.animation_turn_off(num);
        this.destroy_animation();
      } else {
        if (this.mageAnimationActive) {
          this.animation_turn_off(num - 1);
          this.destroy_and_create(this.fallen, num);
        } else {
          this.create_animation(this.fallen);
          this.animation_turn_on(num);
        }
      }
    }
  }

  // tslint:disable-next-line:typedef
  private destroy_and_create(hero: string, num: number) {
    this.destroy_animation();
    setTimeout(() => {
        this.create_animation(hero);
        this.animation_turn_on(num);
      }, 2100
    );
  }

  // tslint:disable-next-line:typedef
  private destroy_animation() {
    setTimeout(() => {
      this.scroll('start');
    }, 1000);
    setTimeout(() => {
      this.target.remove(0);
    }, 2000);
  }

// tslint:disable-next-line:typedef
  animation_turn_on(num: number) {
    let show;
    show = this.el.nativeElement.querySelector('#tile_3');
    this.scroll('tile_3');
    if (num === 1) {
      this.fallenAnimationActive = false;
      this.mageAnimationActive = true;
    } else if (num === 2) {
      this.mageAnimationActive = false;
      this.fallenAnimationActive = true;
    }
    const showTile = 'show_tile1';
    const hideTile = 'hide_tile1';
    if (!show.classList.contains(showTile)) {
      show.classList.add(showTile);
      show.classList.remove(hideTile);
    }
  }

// tslint:disable-next-line:typedef
  animation_turn_off(num: number) {
    const hide = this.el.nativeElement.querySelector('#tile_3');
    if (num === 1) {
      this.mageAnimationActive = false;
    } else if (num === 2) {
      this.fallenAnimationActive = false;
    }
    const showTile = 'show_tile1';
    const hideTile = 'hide_tile1';
    if (hide.classList.contains(showTile)) {
      hide.classList.remove(showTile);
      hide.classList.add(hideTile);
    }
  }

  scroll(id): void {
    try {
      const el = document.getElementById(id);
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (err) {
    }
  }

  // tslint:disable-next-line:typedef
  move_to_download() {
    this.navbar.login();
  }
}


