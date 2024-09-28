export interface MethodConfig {
  methods: Map<number, MethodBook>;
}

export interface MethodBook {
  id: string;
  suit: MethodSuit; // 功法体系
  level: number; // 当前残本对应体系等级
  skill: MethodSkill; // 功法技能
}

export interface MethodSuit {
  name: string; // 功法体系名称
}

export interface MethodSkill {
  name: string; // 功法技能名称
}
