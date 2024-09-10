import { Injectable } from '@angular/core';
import { BaseInfo, BattleInfo, Character, SkillInfo } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseInfo: BaseInfo = {
    name: '小明',
    gender: '男',
    age: 18,
    ability: '智慧',
    hp: 100,
    mp: 100,
    totalHp: 100,
    totalMp: 100,
  };
  skillInfo: SkillInfo = {
    energy: 0,
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
    this.baseInfo = { ...this.baseInfo, ...character.baseInfo };
    this.skillInfo = { ...this.skillInfo, ...character.skillInfo };
    this.battleInfo = { ...this.battleInfo, ...character.battleInfo };
  }

  setBaseInfo(baseInfo: BaseInfo) {
    this.baseInfo = { ...this.baseInfo, ...baseInfo };
  }

  setSkillInfo(skillInfo: SkillInfo) {
    this.skillInfo = { ...this.skillInfo, ...skillInfo };
  }

  setBattleInfo(battleInfo: BattleInfo) {
    this.battleInfo = { ...this.battleInfo, ...battleInfo };
  }
}
