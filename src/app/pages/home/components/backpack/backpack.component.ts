import { Component, inject } from '@angular/core';
import { BagItemViewComponent } from '@components/bag-item-view/bag-item-view.component';
import { BagItem, ItemTypeMap, ItemTypeValueMap } from '@models';
import { BackpackService } from '@services';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-backpack',
  standalone: true,
  imports: [NzTabsModule, NzTypographyModule, BagItemViewComponent],
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
