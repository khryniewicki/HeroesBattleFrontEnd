import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {Observable} from 'rxjs';
import {Download} from '../utils/download/download';
import {DownloadService} from '../utils/download/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  private downloadUrl = '/api/download';
  download$: Observable<Download>;

  constructor(private auth: AuthenticationService, private downloadService: DownloadService) {
  }

  ngOnInit(): void {
  }

// tslint:disable-next-line:typedef
  downloadResource(uri: string) {
    this.download$ = this.downloadService.downloadFromResource(uri);
  }


  //
  // // tslint:disable-next-line:typedef
  // downloadFile(blob: Blob) {
  //
  //     const url = window.URL.createObjectURL(blob);
  //     const anchor = document.createElement('a');
  //
  //     anchor.download = 'heroes_battle.zip';
  //     anchor.href = url;
  //     anchor.click();
  //     URL.revokeObjectURL(url);
  //
  // }
  // }


}
