import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  private downloadUrl = '/api/download';
  private emptyRoomUrl = '/api/option/empty-room';

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  download(uri: string) {
    this.auth.getResource(this.emptyRoomUrl).subscribe(
      p => console.log(p),
      error => console.log(error));
  }

// tslint:disable-next-line:typedef
  download2(uri: string) {
    this.auth.getResource2(this.downloadUrl + '/' + uri).subscribe(
      data => this.downloadFile(data),
      error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  downloadFile(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'heroes_battle.zip';
    anchor.href = url;
    anchor.click();
  }
}
