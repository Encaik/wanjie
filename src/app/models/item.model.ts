import { Effect, EffectType } from './buff.model';

export interface Item {
  id: string; // 物品唯一id
  name: string; // 物品名称
  type: ItemType; // 物品类型
  level: ItemLevel; // 物品等级
  description: string; // 物品描述
  price: number; // 物品价格
  uesable: boolean; // 是否可用
  img?: string; // 物品图标
  effect?: Effect; // 物品作用
}

export interface BagItem {
  id: string; // 物品唯一id
  item: Item; // 物品
  count: number; // 物品数量
}

export enum ItemType {
  Weapon = 1, // 武器
  Armor = 2, // 防具
  Props = 3, // 道具
  Drug = 4, // 药品
  Material = 5 // 材料
}

export const ItemTypeMap: Record<ItemType, string> = {
  [ItemType.Weapon]: '武器',
  [ItemType.Armor]: '防具',
  [ItemType.Props]: '道具',
  [ItemType.Drug]: '药品',
  [ItemType.Material]: '材料'
};

export const ItemTypeValueMap: Record<number, ItemType> = {
  1: ItemType.Weapon,
  2: ItemType.Armor,
  3: ItemType.Props,
  4: ItemType.Drug,
  5: ItemType.Material
};

export enum ItemLevel {
  Common, // 普通
  Rare, // 稀有
  Fine, // 精良
  Premium, // 优质
  Exquisite, // 极品
  Extreme, // 极致
  Divine, // 神话
  Forbidden // 禁忌
}

export const ItemLevelMap: Record<ItemLevel, string> = {
  [ItemLevel.Common]: '普通',
  [ItemLevel.Rare]: '稀有',
  [ItemLevel.Fine]: '精良',
  [ItemLevel.Premium]: '优质',
  [ItemLevel.Exquisite]: '极品',
  [ItemLevel.Extreme]: '极致',
  [ItemLevel.Divine]: '神话',
  [ItemLevel.Forbidden]: '禁忌'
};

export const ItemMap: Record<string, Item> = {
  0: {
    id: '0',
    name: 'dev',
    type: ItemType.Props,
    level: ItemLevel.Forbidden,
    description: '开发测试',
    uesable: false,
    price: 0
  },
  // 特殊物品
  1: {
    id: '1',
    name: '灵石',
    type: ItemType.Material,
    level: ItemLevel.Common,
    description: '万界通用货币，可以兑换各种物品',
    price: 1,
    uesable: false
  },
  // 品质等级测试
  100: {
    id: '100',
    name: '普通',
    type: ItemType.Material,
    level: ItemLevel.Common,
    description: '普通物品',
    price: 1,
    uesable: false
  },
  101: {
    id: '101',
    name: '稀有',
    type: ItemType.Material,
    level: ItemLevel.Rare,
    description: '稀有物品',
    price: 1,
    uesable: false
  },
  102: {
    id: '102',
    name: '精良',
    type: ItemType.Material,
    level: ItemLevel.Fine,
    description: '精良物品',
    price: 1,
    uesable: false
  },
  103: {
    id: '103',
    name: '优质',
    type: ItemType.Material,
    level: ItemLevel.Premium,
    description: '优质物品',
    price: 1,
    uesable: false
  },
  104: {
    id: '104',
    name: '极品',
    type: ItemType.Material,
    level: ItemLevel.Exquisite,
    description: '极品物品',
    price: 1,
    uesable: false
  },
  105: {
    id: '105',
    name: '极致',
    type: ItemType.Material,
    level: ItemLevel.Extreme,
    description: '极致物品',
    price: 1,
    uesable: false
  },
  106: {
    id: '106',
    name: '神话',
    type: ItemType.Material,
    level: ItemLevel.Divine,
    description: '神话物品',
    price: 1,
    uesable: false
  },
  107: {
    id: '107',
    name: '禁忌',
    type: ItemType.Material,
    level: ItemLevel.Forbidden,
    description: '禁忌物品',
    price: 1,
    uesable: false
  },
  // 10000 武器
  10000: {
    id: '10000',
    name: 'dev武器',
    type: ItemType.Weapon,
    level: ItemLevel.Forbidden,
    description: '开发测试使用武器',
    uesable: false,
    price: 0
  },
  // 20000 防具
  20000: {
    id: '20000',
    name: 'dev防具',
    type: ItemType.Armor,
    level: ItemLevel.Forbidden,
    description: '开发测试使用防具',
    uesable: false,
    price: 0
  },
  // 30000 道具
  30000: {
    id: '30000',
    name: 'dev道具',
    type: ItemType.Props,
    level: ItemLevel.Forbidden,
    description: '开发测试使用道具',
    uesable: false,
    price: 0
  },
  // 40000 药品
  40000: {
    id: '40000',
    name: '气血散',
    type: ItemType.Drug,
    level: ItemLevel.Common,
    description: '少量回复气血,服用后恢复50点气血',
    uesable: true,
    price: 10,
    effect: {
      target: EffectType.Character,
      attr: 'statusInfo/hp',
      type: 'number',
      time: 'once',
      value: 50
    }
  },
  40001: {
    id: '40001',
    name: '补血丸',
    type: ItemType.Drug,
    level: ItemLevel.Common,
    description: '较少量回复气血,服用后恢复100点气血',
    uesable: true,
    price: 50,
    effect: {
      target: EffectType.Character,
      attr: 'statusInfo/hp',
      type: 'number',
      time: 'once',
      value: 100
    }
  },
  40002: {
    id: '40001',
    name: '回血丹',
    type: ItemType.Drug,
    level: ItemLevel.Divine,
    description: '中等量回复气血,服用后恢复200点气血',
    uesable: true,
    price: 200,
    effect: {
      target: EffectType.Character,
      attr: 'statusInfo/hp',
      type: 'number',
      time: 'once',
      value: 200
    }
  },
  40003: {
    id: '40001',
    name: '强力回血丹',
    type: ItemType.Drug,
    level: ItemLevel.Divine,
    description: '较大量回复气血,服用后恢复300点气血',
    uesable: true,
    price: 400,
    effect: {
      target: EffectType.Character,
      attr: 'statusInfo/hp',
      type: 'number',
      time: 'once',
      value: 300
    }
  },
  40004: {
    id: '40001',
    name: '再生丹',
    type: ItemType.Drug,
    level: ItemLevel.Exquisite,
    description: '大量回复气血,服用后恢复500点气血',
    uesable: true,
    price: 1000,
    effect: {
      target: EffectType.Character,
      attr: 'statusInfo/hp',
      type: 'number',
      time: 'once',
      value: 500
    }
  },
  40005: {
    id: '40001',
    name: '强力再生丹',
    type: ItemType.Drug,
    level: ItemLevel.Exquisite,
    description: '极大量回复气血,服用后恢复1000点气血',
    uesable: true,
    price: 2000,
    effect: {
      target: EffectType.Character,
      attr: 'statusInfo/hp',
      type: 'number',
      time: 'once',
      value: 1000
    }
  }
};
