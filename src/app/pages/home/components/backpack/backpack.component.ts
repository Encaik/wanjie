import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-backpack',
  standalone: true,
  imports: [NzTabsModule, NzCardModule, NzTypographyModule],
  templateUrl: './backpack.component.html',
  styleUrl: './backpack.component.less'
})
export class BackpackComponent implements OnInit {
  bagTabs: string[] = ['全部', '道具', '装备', '材料'];
  bagItems: string[] = [];

  ngOnInit() {
    this.onBagTabChange(0);
  }

  onBagTabChange(tabIdx: number) {
    this.bagItems = this.getBagItems(this.bagTabs[tabIdx]);
  }

  getBagItems(tab: string) {
    return Array.from({ length: Math.round(Math.random() * 30) + 48 }, (_, i) => `${tab}${i}`);
  }
}
