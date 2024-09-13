import { inject, Injectable } from '@angular/core';
import { CharacterService } from './character.service';
import { EnvService } from './env.service';
import { Character, Env } from '../models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private notice = inject(NzNotificationService);

  timeTick: BehaviorSubject<number> = new BehaviorSubject<number>(10000 * 12 * 3);

  nextTimeTick() {
    this.timeTick.next(this.timeTick.value + 1);
  }

  init(character: Partial<Character>, env: Env) {
    this.characterSrv.setCharacter(character);
    this.envSrv.setEnv(env);
  }

  save() {
    const characterData = this.characterSrv.getCharacter();
    const envData = this.envSrv.getEnv();
    const time = new Date();
    localStorage.setItem(
      'wanjie_data',
      JSON.stringify({
        time: time.getTime(),
        characterData,
        envData
      })
    );
    this.notice.success('保存成功', `您的数据已保存,本次保存时间为${time.toLocaleString()}`);
  }

  load(): Promise<{ characterData: Character; envData: Env } | null> {
    const data = localStorage.getItem('wanjie_data');
    if (data) {
      const parseData = JSON.parse(data);
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
