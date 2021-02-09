import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {Observable} from 'rxjs';
import {Download} from '../services/download/download';
import {DownloadService} from '../services/download/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  download$: Observable<Download>;

  constructor(private auth: AuthenticationService, private downloadService: DownloadService) {
  }

  ngOnInit(): void {
  }

// tslint:disable-next-line:typedef
  downloadResource(uri: string) {
    this.download$ = this.downloadService.downloadFromResource(uri);
  }

}
