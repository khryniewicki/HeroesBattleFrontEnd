import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostListener,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AnimationComponent} from './tiles/animation/animation.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';
import {SubjectService} from '../services/subject/subject.service';
import {APP_CONSTANTS} from '../web/APP_CONSTANTS';
import {NgxSpinnerService} from 'ngx-spinner';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  bg: string;
  class: string;
  id?: string;
}

export interface Hero {
  name: string;
  prettyName: string;
  basicSpell: string;
  basicSpellImage: string;
  ultimateSpell: string;
  ultimateSpellImage: string;
}

@Component({
  providers: [NavbarComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class HomeComponent implements  AfterViewChecked{
  // tslint:disable-next-line:max-line-length
  constructor(private el: ElementRef, private componentFactoryResolver: ComponentFactoryResolver, private subject: SubjectService, private spinner: NgxSpinnerService,
              private router: Router) {
    this.mage = this.getHero('fire_wizard');
    this.fallen = this.getHero('fallen_king');
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.setRatio();
    this.spinner.show(this.getSpinner());

  }

  loaded = false;
  bubbles = 'assets/bg/bubbles1.png';
  bubbles2 = 'assets/bg/bubbles2.png';
  bubbles3 = 'assets/bg/bubbles3.png';
  // tslint:disable-next-line:typedef
  private componentRef: ComponentRef<any>;
  mage: Hero;
  fallen: Hero;
  mageAnimationActive: boolean;
  fallenAnimationActive: boolean;
  innerWidth;
  innerHeight;
  tiles;
  isLargeScreen: boolean;
  ratio;
  @ViewChild('parent', {read: ViewContainerRef}) target: ViewContainerRef;

  bigTiles: Tile[] = [
    {cols: 4, rows: 3, color: 'black', bg: ' url(' + this.bubbles + ')', class: 'tile0'},
    {cols: 2, rows: 2, color: 'black', bg: ' url(' + this.bubbles2 + ')', class: 'tile tile0'},
    {cols: 2, rows: 2, color: 'black', bg: ' url(' + this.bubbles3 + ')', class: 'tile'},
  ];
  smallTiles: Tile[] = [
    {cols: 4, rows: 1, color: 'black', bg: ' url(' + this.bubbles + ')', class: 'tile0'},
    {cols: 4, rows: 1, color: 'black', bg: ' url(' + this.bubbles + ')', class: 'tile0'},
    {cols: 4, rows: 1, color: 'black', bg: ' url(' + this.bubbles2 + ')', class: 'tile tile0'},
    {cols: 4, rows: 1, color: 'black', bg: ' url(' + this.bubbles3 + ')', class: 'tile'},
  ];
  heroes: Hero[] = [
    {
      name: 'fire_wizard', prettyName: 'Fire Mage', basicSpell: 'Fire', basicSpellImage: 'fire',
      ultimateSpell: 'Fire Bomb', ultimateSpellImage: 'firebomb'
    },
    {
      name: 'ice_wizard', prettyName: 'Ice Mage', basicSpell: 'Ice Bolt', basicSpellImage: 'icebolt',
      ultimateSpell: 'Ice Berg', ultimateSpellImage: 'iceberg'
    },
    {
      name: 'thunder_wizard', prettyName: 'Thunder Mage', basicSpell: 'Thunderbolt', basicSpellImage: 'thunderbolt',
      ultimateSpell: 'Lightning', ultimateSpellImage: 'lightning'
    },
    {
      name: 'fallen_king', prettyName: 'Fallen King', basicSpell: 'Black Fire', basicSpellImage: 'blackfire',
      ultimateSpell: 'Skull Curse', ultimateSpellImage: 'skullcurse'
    },
    {
      name: 'fallen_witcher', prettyName: 'Fallen Witcher', basicSpell: 'Electric Shock', basicSpellImage: 'electricshock',
      ultimateSpell: 'Electric Bomb', ultimateSpellImage: 'electricbomb'
    },
    {
      name: 'fallen_monk', prettyName: 'Fallen Monk', basicSpell: 'Frost fury', basicSpellImage: 'frostfury',
      ultimateSpell: 'Bloody Whip', ultimateSpellImage: 'bloodywhip'
    }
  ];


  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.innerHeight = event.target.innerHeight;
    this.setRatio();
    console.log(this.ratio);
  }

  // tslint:disable-next-line:typedef
  private setRatio() {
    const r = this.innerWidth / this.innerHeight;
    const ratioFactor = parseFloat(String(Math.round(this.innerWidth / this.innerHeight * 10) / 10));
    console.log(r + '  ' + ratioFactor)
    this.isLargeScreen = ratioFactor > 1.0;
    this.tiles = this.isLargeScreen ? this.bigTiles : this.smallTiles;
    this.ratio = this.isLargeScreen ? ratioFactor + ':1.0' : '1.0 :' + 1 / ratioFactor;
  }

  // tslint:disable-next-line:typedef
  getHero(value: string): Hero {
    return this.heroes.find(hero => hero.name === value);
  }

// tslint:disable-next-line:typedef
  edit(value: string) {
    this.mage = this.getHero(value);
    if (this.mageAnimationActive) {
      this.animation_turn_off(1);
      this.destroy_animation();
    }
  }

  // tslint:disable-next-line:typedef
  edit2(value: string) {
    this.fallen = this.getHero(value);
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
    if (num === (this.tiles.length - 2)) {
      if (this.mageAnimationActive) {
        this.animation_turn_off(num);
        this.destroy_animation();
      } else {
        if (this.fallenAnimationActive) {
          this.animation_turn_off(num + 1);
          this.destroy_and_create(this.mage.name, num);
        } else {
          this.create_animation(this.mage.name);
          this.animation_turn_on(num);
        }
      }
    } else if (num === (this.tiles.length - 1)) {
      if (this.fallenAnimationActive) {
        this.animation_turn_off(num);
        this.destroy_animation();
      } else {
        if (this.mageAnimationActive) {
          this.animation_turn_off(num - 1);
          this.destroy_and_create(this.fallen.name, num);
        } else {
          this.create_animation(this.fallen.name);
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
    show = this.el.nativeElement.querySelector('#animationGIF');
    this.scroll('animationGIF');
    if (num === (this.tiles.length - 2)) {
      this.fallenAnimationActive = false;
      this.mageAnimationActive = true;
    } else if (num === (this.tiles.length - 1)) {
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
    const hide = this.el.nativeElement.querySelector('#animationGIF');
    if (num === (this.tiles.length - 2)) {
      this.mageAnimationActive = false;
    } else if (num === (this.tiles.length - 1)) {
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
    this.router.navigate(['download']);
  }

  // tslint:disable-next-line:typedef
  getSpinner() {
    return APP_CONSTANTS.SPINNER;
  }

  ngAfterViewChecked(): void {
    this.spinner.hide(this.getSpinner());
    this.loaded = true;
  }

}


