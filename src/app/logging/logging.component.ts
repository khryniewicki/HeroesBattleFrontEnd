import { Component, OnInit } from '@angular/core';

// tslint:disable-next-line:typedef
function statusChangeCallback(response: any) {

}

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  getLoginStatusFB(response) {
    statusChangeCallback(response);
  }
}
