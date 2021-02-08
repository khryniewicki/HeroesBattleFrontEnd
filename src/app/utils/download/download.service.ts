import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../auth/authentication.service';
import {saveAs} from 'file-saver';
import {Observable} from 'rxjs';
import {download, Download} from './download';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloadUrl = '/api/download';

  constructor(private auth: AuthenticationService, private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  downloadFromResource(uri: string): Observable<Download> {
    const file = 'heroes-battle.zip';
    return this.auth.getResource2(this.downloadUrl + '/' + uri).pipe(
      download(blob => saveAs(blob, file)));
  }

  blob(url: string, filename?: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
}

