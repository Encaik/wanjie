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
  Technology
}
