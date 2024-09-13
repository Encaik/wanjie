export interface Env {
  id: string;
  name: string; // 环境名称
  type: EnvType; // 环境类型
  levelMap: Record<number, string>; // 等级体系
  maxEnergy: number; // 最大能量值
  weight: number; // 权重
  galaxiesId: string; // 所属星系id
}

export enum EnvType {
  XianXia = 'xianxia', // 仙侠世界
  Magic = 'magic', // 魔法世界
  Fantasy = 'fantasy', // 奇幻世界
  Technology = 'technology', // 科幻世界
  Modern = 'modern', // 现代世界
  Imperial = 'imperial', // 帝国世界
  Adventure = 'adventure' // 冒险世界
}
