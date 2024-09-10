export interface Character {
  baseInfo: BaseInfo;
  skillInfo: SkillInfo;
  battleInfo: BattleInfo;
}

export interface BaseInfo {
  name: string; // 姓名
  gender: string; // 性别
  age: number; // 年龄
  ability: string; // 特质
  hp: number; // 血量
  mp: number; // 灵力
  totalHp: number; // 总血量
  totalMp: number; // 总灵力
}

export interface SkillInfo {
  energy: number; // 能量
}

export interface BattleInfo {
  attack: number; // 攻击
  defence: number; // 防御
  speed: number; // 敏捷
}

export interface Env {
  name: string; // 环境名称
  type: EnvType; // 环境类型
  levelMap: Record<number, string>; // 等级体系
  maxEnergy: number; // 最大能量值
  weight: number; // 权重
}

export enum EnvType {
  Base,
  XianXia,
  Magic,
  Fantasy,
  Technology,
}
