import { inject, Injectable } from '@angular/core';

import { BaseInfo, Character, LogLevel, LogType, SkillInfo, StatusInfo, LevelInfo, AttrInfo } from '../models';
import { EnvService } from './env.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);

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
    energy: 0,
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

  cultivation(): Promise<boolean> {
    const energy = this.getAddEnergy();
    const levelPrecent = Math.round(this.envSrv.maxEnergy / Object.keys(this.envSrv.levelMap).length);
    const newEnergy = energy + this.levelInfo.energy;
    const newLevel = Math.floor(newEnergy / levelPrecent);
    if (newLevel > this.levelInfo.level) {
      this.logSrv.log({
        msg: `能量已满，请升级后再继续修炼\n`,
        type: LogType.Character,
        level: LogLevel.Info
      });
      this.setLevelInfo({ energy: newEnergy - (newEnergy % levelPrecent) });
      return Promise.resolve(true);
    }
    this.setLevelInfo({ energy: newEnergy });
    return Promise.resolve(false);
  }

  getAddEnergy() {
    const energy =
      100 * this.envSrv.weight + Math.round(Math.random() * this.levelInfo.energy * 0.01) + Math.round(Math.random() * 100 - 50);
    this.logSrv.log({
      msg: `修炼获得${energy}点能量\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    return energy;
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
    character.levelInfo && this.setLevelInfo(character.levelInfo);
    character.skillInfo && this.setSkillInfo(character.skillInfo);
    character.attrInfo && this.setAttrInfo(character.attrInfo);
  }

  setBaseInfo(baseInfo: Partial<BaseInfo>) {
    this.baseInfo = { ...this.baseInfo, ...baseInfo };
  }

  setStatusInfo(statusInfo: Partial<StatusInfo>) {
    this.statusInfo = { ...this.statusInfo, ...statusInfo };
  }

  setLevelInfo(levelInfo: Partial<LevelInfo>) {
    this.levelInfo = { ...this.levelInfo, ...levelInfo };
  }

  setSkillInfo(skillInfo: Partial<SkillInfo>) {
    this.skillInfo = { ...this.skillInfo, ...skillInfo };
  }

  setAttrInfo(attrInfo: Partial<AttrInfo>) {
    this.attrInfo = { ...this.attrInfo, ...attrInfo };
    if (attrInfo.hp) {
      this.statusInfo.hp = attrInfo.hp;
    }
    if (attrInfo.mp) {
      this.statusInfo.mp = attrInfo.mp;
    }
  }
}
