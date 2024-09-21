import { inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, timer } from 'rxjs';

import { Character, Env } from '../models';
import { CharacterService } from './character.service';
import { EnvService } from './env.service';
import { BackpackService } from './backpack.service';
import { BagItem } from '../models/item.model';
import * as CryptoJS from 'crypto-js';

const WANJIE_TOKEN = 'wanjie_data';

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private notice = inject(NzNotificationService);
  private backpackSrv = inject(BackpackService);

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

  init(runtimeData: { tick: number }, characterData: Partial<Character>, envData: Env, backpackData?: BagItem[]) {
    this.characterSrv.setCharacter(characterData);
    this.envSrv.setEnv(envData);
    this.timeTick.next(runtimeData.tick);
    if (backpackData) this.backpackSrv.loadItems(backpackData);
    this.isInit = true;
  }

  save() {
    const characterData = this.characterSrv.getCharacter();
    const envData = this.envSrv.getEnv();
    const backpackData = this.backpackSrv.saveItems();
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
          backpackData
        }),
        WANJIE_TOKEN
      ).toString()
    );
    this.notice.success('保存成功', `您的数据已保存,本次保存时间为${time.toLocaleString()}`);
  }

  load(): Promise<{ runtimeData: { tick: number }; characterData: Character; envData: Env; backpackData: BagItem[] } | null> {
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
