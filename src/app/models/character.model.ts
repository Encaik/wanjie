import { Buff } from './buff.model';

export interface Character {
  id: string;
  baseInfo: BaseInfo; // 基本信息
  statusInfo: StatusInfo; // 状态信息
  skillInfo: SkillInfo; // 技能点信息
  levelInfo: LevelInfo; // 等级信息
  attrInfo: AttrInfo; // 属性信息
}

export type InitCharacter = Omit<Character, 'statusInfo' | 'levelInfo' | 'attrInfo'>;

export interface BaseInfo {
  name: string; // 姓名
  gender: string; // 性别
  age: number; // 年龄
  talent: CharacterTalent[]; // 天赋
}

export interface CharacterTalent {
  name: string;
  buffs: Buff[];
}

export interface StatusInfo {
  hp: number; // 当前血量
  mp: number; // 当前灵力
  buffs: Buff[]; // 当前获得的状态
}

export interface SkillInfo {
  hp: number; // 基础生命
  mp: number; // 基础灵力
  attack: number; // 攻击力
  defence: number; // 防御力
  speed: number; // 敏捷
}

export interface LevelInfo {
  exp: number; // 经验
  power: number; // 战力
  level: number; // 境界（根据当前世界等级动态调整）
}

export interface AttrInfo {
  hp: number; // 基础生命
  mp: number; // 基础灵力
  attack: number; // 攻击力
  defence: number; // 防御力
  speed: number; // 敏捷
  critRate: number; // 暴击率
  critDamage: number; // 暴击伤害
}
