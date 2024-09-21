import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { BagItem, ItemTypeMap, ItemTypeValueMap } from '../../../../models/item.model';
import { BackpackService } from '../../../../services/backpack.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LogService } from '../../../../services/log.service';
import { LogLevel, LogType } from '../../../../models';

@Component({
  selector: 'app-backpack',
  standalone: true,
  imports: [NzTabsModule, NzCardModule, NzTypographyModule, NzPopoverModule, NzButtonModule],
  templateUrl: './backpack.component.html',
  styleUrl: './backpack.component.less'
})
export class BackpackComponent {
  private backpackSrv = inject(BackpackService);
  private logSrv = inject(LogService);
  bagTabs: string[] = ['全部', ...Object.values(ItemTypeMap)];
  tabIdx = 0;

  get bagItems(): BagItem[] {
    return this.backpackSrv.getItems(this.tabIdx ? ItemTypeValueMap[this.tabIdx] : undefined);
  }

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
      msg: `丢弃${count}个${bagItem.item.name}`,
      type: LogType.Item,
      level: LogLevel.Info
    });
  }
}
