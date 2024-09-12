import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  // 定义一个Subject用于发布日志对象
  logSubject = new Subject<Log>();
  // 初始化一个空数组用于存储日志对象
  logList: Log[] = [];

  log(log: Log) {
    log.time = new Date().getTime();
    this.logList.push(log);
    this.logSubject.next(log);
  }
}
