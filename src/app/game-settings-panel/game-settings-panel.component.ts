import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';

export interface TimeHolder {
  time: number;
}

@Component({
  selector: 'app-game-settings-panel',
  templateUrl: './game-settings-panel.component.html',
  styleUrls: ['./game-settings-panel.component.css']
})

export class GameSettingsPanelComponent implements OnInit {
  private emptyRoomUrl = '/api/option/empty-room';
  private initMapUrl = '/api/option/init-map';
  private stopMapUrl = '/api/option/stop-map';
  private testUrl = '/api/option/test';
  private setLogoutTimeUrl = '/api/option/set-logout-time-in-seconds';
  private setLogoutTimeInGameUrl = '/api/option/set-logout-time-without-player-in-seconds';

  setTimeLogOutForm: FormGroup = new FormGroup({
    time: new FormControl('')
  });
  setTimeLogOutInGameForm: FormGroup = new FormGroup({
    time: new FormControl('')
  });


  constructor(private auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  emptyRoom() {
    this.auth.getMsg(this.emptyRoomUrl).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  initMap() {
    this.auth.getMsg(this.initMapUrl).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  stopMap() {
    this.auth.getMsg(this.stopMapUrl).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  test() {
    this.auth.getMsg(this.testUrl).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  setLogoutTime(timeHolder: TimeHolder) {
    const time = timeHolder.time;
    console.log(time);
    this.auth.getMsg(this.setLogoutTimeUrl + '?time=' + time).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  setLogoutTimeInGame(timeHolder: TimeHolder) {
    const time = timeHolder.time;

    console.log(time);

    this.auth.getMsg(this.setLogoutTimeInGameUrl + '?time=' + time).subscribe(
      p => console.log(p),
      error => console.log(error));
  }
}
