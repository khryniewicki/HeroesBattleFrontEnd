import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subject = new Subject<string>();

  // tslint:disable-next-line:typedef
  nextValue(value: string) {
    this.subject.next(value);
  }

  // tslint:disable-next-line:typedef
  clear() {
    this.subject.next();
  }

  // tslint:disable-next-line:typedef
  getValue() {
    return this.subject.asObservable();
  }

  // tslint:disable-next-line:typedef
  unsubscribe() {
    this.subject.unsubscribe();
  }
}
