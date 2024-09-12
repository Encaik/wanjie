export interface Character {
  baseInfo: BaseInfo;
  statusInfo: StatusInfo;
  skillInfo: SkillInfo;
  battleInfo: BattleInfo;
}

export interface BaseInfo {
  id: string;
  name: string; // 姓名
  gender: string; // 性别
  age: number; // 年龄
  ability: string; // 特质
  hp: number; // 总血量
  mp: number; // 总灵力
}

export interface StatusInfo {
  hp: number; // 当前血量
  mp: number; // 当前灵力
}

export interface SkillInfo {
  energy: number; // 能量
  level: number; // 境界（根据当前世界等级动态调整）
}

export interface BattleInfo {
  attack: number; // 攻击
  defence: number; // 防御
  speed: number; // 敏捷
}
