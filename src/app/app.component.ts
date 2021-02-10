import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {of} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {
  title = 'HeroesBattleFrontEnd';
  mySubscription;
  isReady;
  constructor(private router: Router, private spinner: NgxSpinnerService, private cdRef: ChangeDetectorRef) {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = true;
      }
    });
    this.isReady = of(false);
    this.spinner.show();

  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.isReady = true;
    this.cdRef.detectChanges();

  }
}
