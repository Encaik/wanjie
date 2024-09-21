import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { BagItem, ItemTypeMap, ItemTypeValueMap } from '../../../../models/item.model';
import { BackpackService } from '../../../../services/backpack.service';

@Component({
  selector: 'app-backpack',
  standalone: true,
  imports: [NzTabsModule, NzCardModule, NzTypographyModule, NzPopoverModule],
  templateUrl: './backpack.component.html',
  styleUrl: './backpack.component.less'
})
export class BackpackComponent {
  private backpackSrv = inject(BackpackService);
  bagTabs: string[] = ['全部', ...Object.values(ItemTypeMap)];
  tabIdx = 0;

  get bagItems(): BagItem[] {
    return this.backpackSrv.getItems(this.tabIdx ? ItemTypeValueMap[this.tabIdx] : undefined);
  }
}
