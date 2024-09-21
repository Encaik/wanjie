import { Injectable } from '@angular/core';
import { BagItem, Item, ItemMap, ItemType } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class BackpackService {
  items: Map<Item, number> = new Map();

  constructor() {
    this.addItem(ItemMap['0'], 1);
    this.addItem(ItemMap['10000'], 1);
    this.addItem(ItemMap['20000'], 1);
    this.addItem(ItemMap['30000'], 1);
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

  removeItem(item: Item, count: number) {
    if (this.items.has(item)) {
      this.items.set(item, this.items.get(item)! - count);
    }
  }
}
