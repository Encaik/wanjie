import { Component, inject, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BagItem, ItemLevel, ItemLevelMap, ItemMap } from '../../models/item.model';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { LogType, LogLevel } from '../../models';
import { BackpackService } from '../../services/backpack.service';
import { LogService } from '../../services/log.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

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
      msg: `丢弃${count}个<span class="${this.getItemLevelClass(bagItem.item.level)}">${bagItem.item.name}</span>`,
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
        msg: `花费${cost}个灵石，购买了${count}个<span class="${this.getItemLevelClass(bagItem.item.level)}">${bagItem.item.name}</span>`,
        type: LogType.Item,
        level: LogLevel.Info
      });
    } else {
      this.msg.warning('你买不起！');
    }
  }

  getItemLevelClass(level: ItemLevel) {
    const colorMap = {
      [ItemLevel.Common]: 'text-black-500',
      [ItemLevel.Rare]: 'text-green-500',
      [ItemLevel.Fine]: 'text-blue-500',
      [ItemLevel.Premium]: 'text-pink-500',
      [ItemLevel.Exquisite]: 'text-purple-500',
      [ItemLevel.Extreme]: 'text-yellow-500',
      [ItemLevel.Divine]: 'text-orange-500',
      [ItemLevel.Forbidden]: 'text-red-500'
    };
    return colorMap[level];
  }
}
