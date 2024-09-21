export interface Item {
  id: string; // 物品唯一id
  name: string; // 物品名称
  type: ItemType; // 物品类型
  description: string; // 物品描述
  price: number; // 物品价格
  img?: string; // 物品图标
}

export interface BagItem {
  id: string; // 物品唯一id
  item: Item; // 物品
  count: number; // 物品数量
}

export enum ItemType {
  Weapon = 1, // 武器
  Armor = 2, // 防具
  Props = 3 // 道具
}

export const ItemTypeMap: Record<ItemType, string> = {
  [ItemType.Weapon]: '武器',
  [ItemType.Armor]: '防具',
  [ItemType.Props]: '道具'
};

export const ItemTypeValueMap: Record<number, ItemType> = {
  1: ItemType.Weapon,
  2: ItemType.Armor,
  3: ItemType.Props
};

export const ItemMap: Record<string, Item> = {
  0: {
    id: '0',
    name: 'dev',
    type: ItemType.Props,
    description: '开发测试',
    price: 0
  },
  // 10000 武器
  10000: {
    id: '10000',
    name: 'dev武器',
    type: ItemType.Weapon,
    description: '开发测试使用武器',
    price: 0
  },
  // 20000 防具
  20000: {
    id: '20000',
    name: 'dev防具',
    type: ItemType.Armor,
    description: '开发测试使用防具',
    price: 0
  },
  // 30000 道具
  30000: {
    id: '30000',
    name: 'dev道具',
    type: ItemType.Props,
    description: '开发测试使用道具',
    price: 0
  }
};
