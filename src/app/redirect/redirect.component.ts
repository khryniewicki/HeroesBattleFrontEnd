import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: `
    <div class="center">
      <h1 class="inner">{{'redirecting' | translate}}</h1>
      <br>
      <mat-spinner class="mat-warn inner2"></mat-spinner>
    </div>
  `,
  styles: [`
    .center {
      color: #3f474e;
      height: calc(100vh - 20px);
      position: relative;
    }
    .inner{
      color: gray;
      padding: 12px;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .inner2{
      color: gray;
      padding: 12px;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class RedirectComponent implements OnInit {
  active;
  start;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.active = this.activatedRoute.snapshot;
  }

  ngOnInit(): void {
    this.isActive();
  }

  // tslint:disable-next-line:typedef
  isActive() {
    let x = 0;
    const intervalID = setInterval(() => {
      if (++x === 4) {
        this.router.navigate(['home']);
        window.clearInterval(intervalID);
      }
    }, 1000);
  }
}
