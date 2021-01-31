import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  private resourceServerUrl = 'http://localhost:8081/resource-server/api/download/';

  constructor(private auth: AuthenticationService){}
  // , private overlay: OverlayContainer) {
  //   const darkClassName = 'dark-theme';
  //   this.overlay.getContainerElement().classList.add(darkClassName);
  // }


  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  download(uri: string) {
    this.auth.getResource(this.resourceServerUrl + uri).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

// tslint:disable-next-line:typedef
  download2(uri: string) {
    this.auth.getResource2(this.resourceServerUrl + uri).subscribe(
      data =>
        this.downloadFile(data),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  downloadFile(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'heroes_battle.zip';
    anchor.href = url;
    anchor.click();
    // window.open(url);
  }
}
