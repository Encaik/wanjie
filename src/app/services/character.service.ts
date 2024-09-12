import { inject, Injectable } from '@angular/core';

import { BaseInfo, BattleInfo, Character, LogLevel, LogType, SkillInfo } from '../models';
import { EnvService } from './env.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);

  baseInfo: BaseInfo = {
    name: '',
    gender: '',
    age: 0,
    ability: '',
    hp: 100,
    mp: 100,
    totalHp: 100,
    totalMp: 100
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
      skillInfo: this.skillInfo,
      battleInfo: this.battleInfo
    };
  }

  setCharacter(character: Character) {
    this.setBaseInfo(character.baseInfo);
    this.setSkillInfo(character.skillInfo);
    this.setBattleInfo(character.battleInfo);
  }

  setBaseInfo(baseInfo: Partial<BaseInfo>) {
    this.baseInfo = { ...this.baseInfo, ...baseInfo };
  }

  setSkillInfo(skillInfo: Partial<SkillInfo>) {
    this.skillInfo = { ...this.skillInfo, ...skillInfo };
  }

  setBattleInfo(battleInfo: Partial<BattleInfo>) {
    this.battleInfo = { ...this.battleInfo, ...battleInfo };
  }
}
