import { inject, Injectable } from '@angular/core';

import { BaseInfo, Character, LogLevel, LogType, SkillInfo, StatusInfo, LevelInfo, AttrInfo } from '../models';
import { CharacterEventOperate, Event, EventRes } from '../models/event.model';
import { StatisticsService } from '../storages/statistics.service';
import { EnvService } from './env.service';
import { LogService } from './log.service';
import { RuntimeService } from './runtime.service';
import { TimeTickService } from './time-tick.service';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);
  private statisticsSrv = inject(StatisticsService);
  private timeTickSrv = inject(TimeTickService);

  id: string = '';
  baseInfo: BaseInfo = {
    name: '',
    gender: '',
    age: 0,
    talent: []
  };
  statusInfo: StatusInfo = {
    hp: 100,
    mp: 100,
    buffs: []
  };
  levelInfo: LevelInfo = {
    exp: 0,
    power: 0,
    level: 0
  };
  skillInfo: SkillInfo = {
    hp: 0,
    mp: 0,
    attack: 0,
    defence: 0,
    speed: 0
  };
  attrInfo: AttrInfo = {
    hp: 100,
    mp: 100,
    attack: 50,
    defence: 50,
    speed: 10,
    critRate: 5,
    critDamage: 20
  };

  canUpgrade: boolean = false;

  eventDetail(event: Event): Observable<EventRes> {
    this.timeTickSrv.nextTimeTick();
    switch (event.operate) {
      case CharacterEventOperate.Cultivation:
        this.statisticsSrv.characterStatistics.cultivationCount++;
        return of({
          status: 'success',
          msg: '',
          data: this.cultivation()
        } as EventRes).pipe(delay(1000));
      case CharacterEventOperate.Upgrade:
        return of({
          status: 'success',
          msg: '',
          data: this.upgrade()
        });
      default:
        throw new Error('不支持的角色事件操作');
    }
  }

  cultivation(): boolean {
    const exp = this.getAddExp();
    const levelPrecent = Math.round(this.envSrv.maxExp / Object.keys(this.envSrv.levelMap).length);
    const newExp = exp + this.levelInfo.exp;
    const newLevel = Math.floor(newExp / levelPrecent);
    if (newLevel > this.levelInfo.level) {
      this.logSrv.log({
        msg: `经验已满，请升级后再继续修炼\n`,
        type: LogType.Character,
        level: LogLevel.Info
      });
      this.setLevelInfo({ exp: newExp - (newExp % levelPrecent) });
      this.canUpgrade = true;
    }
    this.setLevelInfo({ exp: newExp });
    if (this.statusInfo.hp < this.attrInfo.hp) {
      const hp = this.statusInfo.hp + Math.round(this.attrInfo.hp / 20);
      this.setStatusInfo({ hp: hp > this.attrInfo.hp ? this.attrInfo.hp : hp });
    }
    if (this.statusInfo.mp < this.attrInfo.mp) {
      const mp = this.statusInfo.mp + Math.round(this.attrInfo.mp / 20);
      this.setStatusInfo({ mp: mp > this.attrInfo.mp ? this.attrInfo.mp : mp });
    }
    return this.canUpgrade;
  }

  upgrade() {
    const level = this.levelInfo.level;
    this.logSrv.log({
      msg: `恭喜你，你从${this.envSrv.levelMap[level]}升到了${this.envSrv.levelMap[level + 1]}\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    this.setLevelInfo({
      level: level + 1
    });
    this.logSrv.log({
      msg: `恭喜你，获得了${this.skillInfo.hp}点生命，${this.skillInfo.mp}点灵力，${this.skillInfo.attack}点攻击，${this.skillInfo.defence}点防御和${this.skillInfo.speed}点敏捷\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    this.setAttrInfo({
      hp: this.attrInfo.hp + this.skillInfo.hp,
      mp: this.attrInfo.mp + this.skillInfo.mp,
      attack: this.attrInfo.attack + this.skillInfo.attack,
      defence: this.attrInfo.defence + this.skillInfo.defence,
      speed: this.attrInfo.speed + this.skillInfo.speed
    });
    this.canUpgrade = false;
  }

  getAddExp() {
    const exp = Math.round(100 * this.envSrv.weight + Math.random() * this.levelInfo.exp * 0.01 + (Math.random() * 100 - 50));
    this.logSrv.log({
      msg: `修炼获得${exp}点经验\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    return exp;
  }

  getCharacter(): Character {
    return {
      id: this.id,
      baseInfo: this.baseInfo,
      statusInfo: this.statusInfo,
      levelInfo: this.levelInfo,
      skillInfo: this.skillInfo,
      attrInfo: this.attrInfo
    };
  }

  setCharacter(character: Partial<Character>) {
    character.id && (this.id = character.id);
    character.baseInfo && this.setBaseInfo(character.baseInfo);
    character.statusInfo && this.setStatusInfo(character.statusInfo);
    character.skillInfo && this.setSkillInfo(character.skillInfo);
    character.attrInfo && this.setAttrInfo(character.attrInfo);
    character.levelInfo && this.setLevelInfo(character.levelInfo);
  }

  updatePower(attrInfo: AttrInfo = this.attrInfo) {
    this.setLevelInfo({
      power: attrInfo.hp + attrInfo.mp + attrInfo.attack + attrInfo.defence + attrInfo.speed
    });
  }

  setInfoByPath(path: string[], value: number, type: 'number' | 'percent') {
    const currentValue = this.getInfoByPath(path);
    this.setCharacter({
      [path[0]]: {
        [path[1]]: type === 'number' ? currentValue + value : currentValue * (1 + value * 0.01)
      }
    });
  }

  getInfoByPath(path: string[]): number {
    const self: any = this;
    return self[path[0]][path[1]];
  }

  setBaseInfo(baseInfo: Partial<BaseInfo>) {
    this.baseInfo = { ...this.baseInfo, ...baseInfo };
  }

  setStatusInfo(statusInfo: Partial<StatusInfo>) {
    if (statusInfo.hp && statusInfo.hp > this.attrInfo.hp) statusInfo.hp = this.attrInfo.hp;
    if (statusInfo.mp && statusInfo.mp > this.attrInfo.mp) statusInfo.mp = this.attrInfo.mp;
    this.statusInfo = { ...this.statusInfo, ...statusInfo };
  }

  setLevelInfo(levelInfo: Partial<LevelInfo>) {
    this.levelInfo = { ...this.levelInfo, ...levelInfo };
  }

  setSkillInfo(skillInfo: Partial<SkillInfo>) {
    this.skillInfo = { ...this.skillInfo, ...skillInfo };
    this.updatePower();
  }

  setAttrInfo(attrInfo: Partial<AttrInfo>) {
    this.attrInfo = { ...this.attrInfo, ...attrInfo };
    this.updatePower();
    if (attrInfo.hp) {
      this.statusInfo.hp = attrInfo.hp;
    }
    if (attrInfo.mp) {
      this.statusInfo.mp = attrInfo.mp;
    }
  }
}
