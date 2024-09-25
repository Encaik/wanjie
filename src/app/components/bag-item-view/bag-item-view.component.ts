import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BagItem, getItemLevelClass, ItemLevelMap, ItemMap } from '../../models/item.model';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { LogType, LogLevel } from '../../models';
import { BackpackService } from '../../services/backpack.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-item-view',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzPopoverModule, NzButtonModule, NzMessageModule],
  templateUrl: './bag-item-view.component.html',
  styleUrl: './bag-item-view.component.less'
})
export class BagItemViewComponent {
  private backpackSrv = inject(BackpackService);
  private logSrv = inject(LogService);
  private msg = inject(NzMessageService);

  @Input() bagItems: BagItem[] = [];
  @Input() bagType: 'character' | 'shop' = 'character';

  ItemLevelMap = ItemLevelMap;
  getItemLevelClass = getItemLevelClass;

  onItemUseClick(bagItem: BagItem) {
    this.backpackSrv.useItem(bagItem.item).then(res => {
      if (!res) {
        this.backpackSrv.removeItem(bagItem.item, 1);
      } else {
        console.log(res);
      }
    });
  }

  onItemDropClick(bagItem: BagItem, count: number) {
    this.backpackSrv.removeItem(bagItem.item, count);
    this.logSrv.log({
      msg: `丢弃${count}个<span class="${getItemLevelClass(bagItem.item.level)}">${bagItem.item.name}</span>`,
      type: LogType.Item,
      level: LogLevel.Info
    });
  }

  onItemBuyClick(bagItem: BagItem, count: number) {
    const cost = bagItem.item.price * count;
    const money = this.backpackSrv.getItemCountById('1');
    if (money > cost) {
      this.backpackSrv.addItem(bagItem.item, count);
      this.backpackSrv.removeItem(ItemMap['1'], cost);
      bagItem.count -= count;
      this.logSrv.log({
        msg: `花费${cost}个灵石，购买了${count}个<span class="${getItemLevelClass(bagItem.item.level)}">${bagItem.item.name}</span>`,
        type: LogType.Item,
        level: LogLevel.Info
      });
    } else {
      this.msg.warning('你买不起！');
    }
  }
}
