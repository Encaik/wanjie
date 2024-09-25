import { inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, timer } from 'rxjs';

import { StorageData, TASKS } from '../models';
import { BackpackService } from './backpack.service';
import { CharacterService } from './character.service';
import { EnvService } from './env.service';
import { TaskService } from './task.service';

const WANJIE_TOKEN = 'wanjie_data';

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private notice = inject(NzNotificationService);
  private backpackSrv = inject(BackpackService);
  private taskSrv = inject(TaskService);

  isInit: boolean = false;
  timeTick: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  nextTimeTick() {
    this.timeTick.next(this.timeTick.value + 1);
    if (this.timeTick.value % 36 === 0) {
      this.characterSrv.setBaseInfo({
        age: this.characterSrv.baseInfo.age + 1
      });
    }
  }

  init(storageData: StorageData) {
    this.characterSrv.setCharacter(storageData.characterData);
    this.envSrv.setEnv(storageData.envData);
    this.timeTick.next(storageData.runtimeData.tick);
    this.backpackSrv.loadItems(storageData.backpackData);
    this.taskSrv.setCurrentTask(TASKS[storageData.taskData]);
    this.isInit = true;
  }

  save() {
    const characterData = this.characterSrv.getCharacter();
    const envData = this.envSrv.getEnv();
    const backpackData = this.backpackSrv.saveItems();
    const taskData = this.taskSrv.getCurrentTask()?.id;
    const time = new Date();
    localStorage.setItem(
      WANJIE_TOKEN,
      CryptoJS.AES.encrypt(
        JSON.stringify({
          time: time.getTime(),
          runtimeData: {
            tick: this.timeTick.value
          },
          characterData,
          envData,
          backpackData,
          taskData
        }),
        WANJIE_TOKEN
      ).toString()
    );
    this.notice.success('保存成功', `您的数据已保存,本次保存时间为${time.toLocaleString()}`);
  }

  load(): Promise<StorageData | null> {
    const data = localStorage.getItem(WANJIE_TOKEN);
    if (data) {
      const parseData = JSON.parse(CryptoJS.AES.decrypt(data, WANJIE_TOKEN).toString(CryptoJS.enc.Utf8));
      return Promise.resolve(parseData);
    }
    return Promise.resolve(null);
  }

  delete(): Observable<any> {
    localStorage.removeItem('wanjie_data');
    this.notice.success('删档成功', `您的数据已全部清除`);
    return timer(3000);
  }
}
