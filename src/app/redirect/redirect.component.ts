import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-redirect',
  template: `

    <ngx-spinner bdColor="rgba(0, 0, 0, 0.9)" class="spinner" color="#fff" [size]="size" type="pacman" [fullScreen]="true"><h2
      style="color: white; padding: 0"> {{redirecting | translate}} <br> {{'redirectingWait' | translate}} </h2></ngx-spinner>

  `,
  styles: [`
    h2{
      margin-top: 50px;
    }
    @media screen and (max-width: 800px) {
      h2 {
        font-size: 1vh;
        line-height: 1.6;
      }
    }
  `
  ]
})
export class RedirectComponent implements OnInit {
  active;
  redirecting;
  size;

  @HostListener('window:resize', ['$event'])
  // tslint:disable-next-line:typedef
  onResize(event) {
    const width = event.target.innerWidth;
    console.log(width);
    this.getSize(width);
  }


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) {
    this.active = this.activatedRoute.snapshot;
    this.redirecting = 'redirecting';
  }

  ngOnInit(): void {
    this.spinner.show();
    this.isActive();
    this.getSize(window.innerWidth);
  }

  // tslint:disable-next-line:typedef
  private getSize(width: number) {
    if (+width < 800) {
      this.size = 'small';
    } else {
      this.size = 'medium';
    }
  }

  // tslint:disable-next-line:typedef
  isActive() {
    let x = 0;
    const intervalID = setInterval(() => {
      if (++x === 4) {
        this.redirecting = 'redirecting2';
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['home']);
          window.clearInterval(intervalID);
        }, 1500);
      }
    }, 1000);
  }


}
