import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { LogType, LogLevel, EventType, ItemEventOperate, EventRes } from '@models';
import { BagItem, getItemLevelClass, ItemLevelMap, ItemMap } from '@models';
import { BackpackService, EventService, LogService } from '@services';
import { getItemSpan } from '@utils/html';
import { of, switchMap } from 'rxjs';

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
  private event = inject(EventService);

  @Input() bagItems: BagItem[] = [];
  @Input() bagType: 'character' | 'shop' = 'character';

  ItemLevelMap = ItemLevelMap;
  getItemLevelClass = getItemLevelClass;

  onItemUseClick(bagItem: BagItem) {
    this.event
      .sendEvent({
        type: EventType.Item,
        operate: ItemEventOperate.Use,
        data: {
          item: bagItem.item,
          count: 1
        }
      })
      .subscribe((res: EventRes) => {
        if (res.status === 'success') {
          this.event
            .sendEvent({
              type: EventType.Item,
              operate: ItemEventOperate.Drop,
              data: {
                item: bagItem.item,
                count: 1
              }
            })
            .subscribe(() => {});
        }
      });
  }

  onItemDropClick(bagItem: BagItem, count: number) {
    this.event
      .sendEvent({
        type: EventType.Item,
        operate: ItemEventOperate.Drop,
        data: {
          item: bagItem.item,
          count
        }
      })
      .subscribe((res: EventRes) => {
        if (res.status === 'success') {
          this.logSrv.log({
            msg: `丢弃${count}个${getItemSpan(bagItem.item.level, bagItem.item.name)}`,
            type: LogType.Item,
            level: LogLevel.Info
          });
        }
      });
  }

  onItemBuyClick(bagItem: BagItem, count: number) {
    const cost = bagItem.item.price * count;
    const money = this.backpackSrv.getItemCountById('1');
    if (money > cost) {
      this.event
        .sendEvent({
          type: EventType.Item,
          operate: ItemEventOperate.Add,
          data: {
            item: bagItem.item,
            count
          }
        })
        .pipe(
          switchMap((addRes: EventRes) => {
            if (addRes.status === 'success') {
              return this.event.sendEvent({
                type: EventType.Item,
                operate: ItemEventOperate.Drop,
                data: {
                  item: ItemMap['1'],
                  count: cost
                }
              });
            } else {
              return of({
                status: 'fail',
                msg: '物品添加失败',
                data: null
              });
            }
          })
        )
        .subscribe(dropRes => {
          if (dropRes.status === 'success') {
            bagItem.count -= count;
            this.logSrv.log({
              msg: `花费${cost}个灵石，购买了${count}个${getItemSpan(bagItem.item.level, bagItem.item.name)}`,
              type: LogType.Item,
              level: LogLevel.Info
            });
          }
        });
    } else {
      this.msg.warning('你买不起！');
    }
  }
}
