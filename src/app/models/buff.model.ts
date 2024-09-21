export interface Buff {
  name: string;
  attrs: Effect[];
}

export interface Effect {
  target: EffectType; // 作用对象
  attr: string; // 属性
  type: 'number' | 'percent'; // 类型，数值或百分比
  time: number | 'once'; // 时效，临时或永久
  value: number;
}

export enum EffectType {
  Character = 1, // 角色
  Env = 2, // 环境
  Item = 3 // 物品
}
