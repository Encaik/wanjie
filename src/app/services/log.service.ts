import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logSubject = new Subject<string>();

  log(msg: string) {
    this.logSubject.next(msg);
  }
}
