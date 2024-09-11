import { Injectable } from '@angular/core';
import { BaseInfo, BattleInfo, Character, SkillInfo } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseInfo: BaseInfo = {
    name: '',
    gender: '',
    age: 0,
    ability: '',
    hp: 100,
    mp: 100,
    totalHp: 100,
    totalMp: 100,
  };
  skillInfo: SkillInfo = {
    energy: 0,
    level: 0,
  };
  battleInfo: BattleInfo = {
    attack: 10,
    defence: 10,
    speed: 5,
  };

  getCharacter() {
    return {
      baseInfo: this.baseInfo,
      skillInfo: this.skillInfo,
      battleInfo: this.battleInfo,
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
