import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {AuthenticationService, ExtendedMessage, Msg} from '../auth/authentication.service';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {DownloadService} from '../services/download/download.service';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isChecked: boolean;
  lang: string;
  public isLoggedIn = false;
  public isAdmin = false;
  extended: ExtendedMessage;
  interval;
  isBroad;
  @ViewChild('drawer') public drawer: MatDrawer;

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, public translate: TranslateService, private eRef: ElementRef,
              private authService: AuthenticationService, private router: Router, private downloadService: DownloadService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');
    this.isBroad = window.innerWidth >= 500;
    this.lang = 'PL';
    this.isChecked = true;
    if (Cookie.check('language')) {
      const language = Cookie.get('language');
      this.isChecked = language === 'PL';
      this.setLanguage(this.isChecked);
    }
  }

  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  onResize(event) {
    this.isBroad = event.target.innerWidth >= 500;
  }

// tslint:disable-next-line:typedef
  ngOnInit() {
    this.getExtended();

    this.isLoggedIn = this.authService.checkCredentials();
    if (this.isLoggedIn) {
      this.checkRole();
    }
    const i = window.location.href.indexOf('code');
    // tslint:disable-next-line:triple-equals
    if (!this.isLoggedIn && i != -1) {
      const s = window.location.href.substring(i + 5);
      this.authService.retrieveToken(s);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  // tslint:disable-next-line:typedef
  switchLang(event: MatSlideToggleChange) {
    const checked = event.checked;
    this.setLanguage(checked);
    Cookie.set('language', this.lang);
  }


  // tslint:disable-next-line:typedef
  private setLanguage(checked: boolean) {
    const langs = this.translate.getLangs();
    if (checked) {
      this.translate.use(langs[1]);
      this.lang = 'PL';
    } else {
      this.translate.use(langs[0]);
      this.lang = 'EN';
    }
  }

// tslint:disable-next-line:typedef
  checkRole() {
    return this.authService.checkRole().subscribe(auth => {
        this.isAdmin = auth.credentials;
      },
      err => console.log(err)
    );
  }

// tslint:disable-next-line:typedef
  getExtended() {
    this.interval = setInterval(() =>
      this.downloadService.getExtendedMessage().subscribe((data => {
        this.extended = data;
        if (this.extended.heroesMap) {
          const map = new Map<string, Msg>();
          // tslint:disable-next-line:forin
          for (const entry in data.heroesMap) {
            map.set(entry, data.heroesMap[entry]);
          }
          this.extended.heroesMap = map;
        }
      })), 1000);
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login();
  }

  // tslint:disable-next-line:typedef
  account() {
    window.location.href = this.authService.authHost + '/auth/realms/heroes_battle/account/';
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logout();
  }

  // tslint:disable-next-line:typedef
  game_panel() {
    this.router.navigate(['game-settings-panel']);
  }

  // tslint:disable-next-line:typedef
  download() {
    this.router.navigate(['download']);
  }

  // tslint:disable-next-line:typedef
  details() {
    this.router.navigate(['game-details']);
  }

  @HostListener('document:click', ['$event'])
  // tslint:disable-next-line:typedef
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target) && this.drawer.opened) {
      this.drawer.toggle();
    }
  }
}
