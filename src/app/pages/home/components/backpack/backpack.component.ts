import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { Item, ItemType, ItemTypeMap, ItemTypeValueMap } from '../../../../models/item.model';

@Component({
  selector: 'app-backpack',
  standalone: true,
  imports: [NzTabsModule, NzCardModule, NzTypographyModule, NzPopoverModule],
  templateUrl: './backpack.component.html',
  styleUrl: './backpack.component.less'
})
export class BackpackComponent implements OnInit {
  bagTabs: string[] = ['全部', ...Object.values(ItemTypeMap)];
  bagItems: Item[] = [];

  ngOnInit() {
    this.onBagTabChange(0);
  }

  onBagTabChange(tabIdx: number) {
    this.bagItems = this.getBagItems(tabIdx ? ItemTypeValueMap[tabIdx] : null);
  }

  getBagItems(itemType: ItemType | null): Item[] {
    return Array.from({ length: Math.round(Math.random() * 30) + 48 }, (_, i) => {
      const tempItemType = ItemTypeValueMap[Math.round(Math.random() * 2 + 1)];
      return {
        id: `item-${i}`,
        name: `${itemType ? ItemTypeMap[itemType] : '全部'}${i}`,
        type: itemType || tempItemType,
        description: `${itemType ? ItemTypeMap[itemType] : '全部'}${i}的描述`,
        price: Math.round(Math.random() * 1000),
        count: Math.round(Math.random() * 100)
      };
    });
  }
}
