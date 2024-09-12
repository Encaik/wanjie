import { inject, Injectable } from '@angular/core';

import { BaseInfo, BattleInfo, Character, LogLevel, LogType, SkillInfo, StatusInfo } from '../models';
import { EnvService } from './env.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);

  baseInfo: BaseInfo = {
    id: '',
    name: '',
    gender: '',
    age: 0,
    ability: '',
    hp: 100,
    mp: 100
  };
  statusInfo: StatusInfo = {
    hp: 100,
    mp: 100
  };
  skillInfo: SkillInfo = {
    energy: 0,
    level: 0
  };
  battleInfo: BattleInfo = {
    attack: 10,
    defence: 10,
    speed: 5
  };

  cultivation(): Promise<boolean> {
    const energy = this.getAddEnergy();
    const newEnergy = energy + this.skillInfo.energy;
    const newLevel = Math.floor(newEnergy / (1000 * this.envSrv.weight));
    if (newLevel > this.skillInfo.level) {
      this.logSrv.log({
        msg: `能量已满，请升级后再继续修炼\n`,
        type: LogType.Character,
        level: LogLevel.Info
      });
      this.setSkillInfo({ energy: newEnergy - (newEnergy % (1000 * this.envSrv.weight)) });
      return Promise.resolve(true);
    }
    this.setSkillInfo({ energy: newEnergy });
    return Promise.resolve(false);
  }

  getAddEnergy() {
    const energy =
      100 * this.envSrv.weight + Math.round(Math.random() * this.skillInfo.energy * 0.01) + Math.round(Math.random() * 100 - 50);
    this.logSrv.log({
      msg: `修炼获得${energy}点能量\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    return energy;
  }

  getCharacter() {
    return {
      baseInfo: this.baseInfo,
      statusInfo: this.statusInfo,
      skillInfo: this.skillInfo,
      battleInfo: this.battleInfo
    };
  }

  setCharacter(character: Partial<Character>) {
    character.baseInfo && this.setBaseInfo(character.baseInfo);
    character.statusInfo && this.setStatusInfo(character.statusInfo);
    character.skillInfo && this.setSkillInfo(character.skillInfo);
    character.battleInfo && this.setBattleInfo(character.battleInfo);
  }

  setBaseInfo(baseInfo: Partial<BaseInfo>) {
    this.baseInfo = { ...this.baseInfo, ...baseInfo };
    if ('hp' in baseInfo && baseInfo.hp) {
      this.statusInfo.hp = baseInfo.hp;
    }
    if ('mp' in baseInfo && baseInfo.mp) {
      this.statusInfo.mp = baseInfo.mp;
    }
  }

  setStatusInfo(statusInfo: Partial<StatusInfo>) {
    this.statusInfo = { ...this.statusInfo, ...statusInfo };
  }

  setSkillInfo(skillInfo: Partial<SkillInfo>) {
    this.skillInfo = { ...this.skillInfo, ...skillInfo };
  }

  setBattleInfo(battleInfo: Partial<BattleInfo>) {
    this.battleInfo = { ...this.battleInfo, ...battleInfo };
  }
}
