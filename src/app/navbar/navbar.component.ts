import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TranslateService} from '@ngx-translate/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isChecked: boolean;
  lang: string;

  constructor(private breakpointObserver: BreakpointObserver, public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    this.lang = 'EN';
  }

  // tslint:disable-next-line:typedef
  switchLang(event: MatSlideToggleChange) {
    const checked = event.checked;
    const langs = this.translate.getLangs();
    if (checked) {
      this.translate.use(langs[1]);
      this.lang = 'PL';
    } else {
      this.translate.use(langs[0]);
      this.lang = 'EN';

    }
  }

}
