import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logSubject = new Subject<Log>();
  logList: Log[] = [];

  log(log: Log) {
    log.time = new Date().getTime();
    this.logList.push(log);
    this.logSubject.next(log);
  }
}
