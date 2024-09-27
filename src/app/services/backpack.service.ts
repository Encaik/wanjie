import { inject, Injectable } from '@angular/core';

import { Effect, EffectType, LogLevel, LogType, RewardItem } from '../models';
import { BagItem, getItemLevelClass, Item, ItemMap, ItemType } from '../models/item.model';
import { CharacterService } from './character.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class BackpackService {
  private characterSrv = inject(CharacterService);
  private logSrv = inject(LogService);
  items: Map<Item, number> = new Map();

  constructor() {}

  getItemCountById(id: string) {
    return this.items.get(ItemMap[id]) || 0;
  }

  saveItems() {
    const items: Array<{ id: string; count: number }> = [];
    this.items.forEach((count, item) => {
      items.push({ id: item.id, count });
    });
    return items;
  }

  loadItems(items: BagItem[]) {
    items.forEach(item => {
      this.items.set(ItemMap[item.id], item.count);
    });
  }

  getItems(type?: ItemType): BagItem[] {
    const items: BagItem[] = [];
    this.items.forEach((count, item) => {
      if (!type || type === item.type) {
        items.push({ id: item.id, item, count });
      }
    });
    return items;
  }

  addItem(item: Item, count: number) {
    if (this.items.has(item)) {
      this.items.set(item, this.items.get(item)! + count);
    } else {
      this.items.set(item, count);
    }
  }

  addRewardItems(rewardItems: RewardItem[]) {
    let msg: string = '';
    rewardItems.forEach(i => {
      const item = ItemMap[i.id];
      this.addItem(item, i.count);
      msg += `<span class="${getItemLevelClass(item.level)}">${item.name}</span> * ${i.count} `;
    });
    this.logSrv.log({
      msg: `获得物品: ${msg}`,
      type: LogType.Item,
      level: LogLevel.Info
    });
  }

  removeItem(item: Item, count: number) {
    if (this.items.has(item)) {
      const count = this.items.get(item)! - 1;
      if (count < 1) {
        this.items.delete(item);
      } else {
        this.items.set(item, count);
      }
    }
  }

  useItem(item: Item) {
    return new Promise(resolve => {
      try {
        if (item.effect) {
          this.useItemEffect(item.effect);
        }
        this.logSrv.log({
          msg: `使用了${item.name}`,
          type: LogType.Item,
          level: LogLevel.Info
        });
        resolve(null);
      } catch (error) {
        this.logSrv.log({
          msg: '物品使用失败',
          type: LogType.Item,
          level: LogLevel.Info
        });
        resolve(error);
      }
    });
  }

  useItemEffect(effect: Effect) {
    switch (effect.target) {
      case EffectType.Character:
        const attrPath = effect.attr.split('/');
        this.characterSrv.setInfoByPath(attrPath, effect.value, effect.type);
        break;
      default:
        throw new Error('不支持的作用对象');
    }
  }
}
