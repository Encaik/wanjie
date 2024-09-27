import { inject, Injectable } from '@angular/core';
import { EventRes, StorageData, SystemEventOperate, TASKS, Event } from '@models';
import { BackpackService, CharacterService, EnvService, TaskService, TimeTickService } from '@services';
import { StatisticsService } from '@storages/statistics.service';
import * as CryptoJS from 'crypto-js';
import { Observable, of, timer } from 'rxjs';

const WANJIE_TOKEN = 'wanjie_data';

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private backpackSrv = inject(BackpackService);
  private taskSrv = inject(TaskService);
  private timeTickSrv = inject(TimeTickService);
  private statisticsSrv = inject(StatisticsService);

  isInit: boolean = false;

  eventDetail(event: Event): Observable<EventRes> {
    switch (event.operate) {
      case SystemEventOperate.Save:
        return this.save();
      case SystemEventOperate.Load:
        return this.load();
      case SystemEventOperate.Delete:
        return this.delete();
      default:
        throw new Error('不支持的系统事件操作');
    }
  }

  init(storageData: StorageData) {
    this.characterSrv.setCharacter(storageData.characterData);
    this.envSrv.setEnv(storageData.envData);
    this.timeTickSrv.setTimeTick(storageData.timeTickData);
    this.backpackSrv.loadItems(storageData.backpackData);
    this.taskSrv.setCurrentTask(TASKS[storageData.taskData]);
    if (storageData.statisticsData) {
      this.statisticsSrv.setStatistics(storageData.statisticsData);
    }
    this.isInit = true;
  }

  save(): Observable<EventRes> {
    const characterData = this.characterSrv.getCharacter();
    const envData = this.envSrv.getEnv();
    const backpackData = this.backpackSrv.saveItems();
    const taskData = this.taskSrv.getCurrentTask()?.id;
    const timeTickData = this.timeTickSrv.getTimeTick();
    const statisticsData = this.statisticsSrv.getStatistics();
    const time = new Date();
    localStorage.setItem(
      WANJIE_TOKEN,
      CryptoJS.AES.encrypt(
        JSON.stringify({
          time: time.getTime(),
          timeTickData,
          characterData,
          envData,
          backpackData,
          taskData,
          statisticsData
        }),
        WANJIE_TOKEN
      ).toString()
    );
    return of({
      status: 'success',
      msg: `您的数据已保存,本次保存时间为${time.toLocaleString()}`,
      data: time
    });
  }

  load(): Observable<EventRes<StorageData>> {
    const data = localStorage.getItem(WANJIE_TOKEN);
    if (data) {
      const parseData = JSON.parse(CryptoJS.AES.decrypt(data, WANJIE_TOKEN).toString(CryptoJS.enc.Utf8));
      return of({
        status: 'success',
        msg: '',
        data: parseData
      });
    }
    throw new Error('没有找到数据');
  }

  delete(): Observable<EventRes> {
    localStorage.removeItem('wanjie_data');
    return of({
      status: 'success',
      msg: `您的数据已全部清除`,
      data: null
    });
  }
}
