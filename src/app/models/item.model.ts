export interface Item {
  id: string; // 物品唯一id
  name: string; // 物品名称
  type: ItemType; // 物品类型
  description: string; // 物品描述
  price: number; // 物品价格
  img?: string; // 物品图标
  count: number; // 持有物品数量
}

export enum ItemType {
  Weapon = 1,
  Armor = 2,
  Accessory = 3
}

export const ItemTypeMap: Record<ItemType, string> = {
  [ItemType.Weapon]: '武器',
  [ItemType.Armor]: '防具',
  [ItemType.Accessory]: '首饰'
};

export const ItemTypeValueMap: Record<number, ItemType> = {
  1: ItemType.Weapon,
  2: ItemType.Armor,
  3: ItemType.Accessory
};
