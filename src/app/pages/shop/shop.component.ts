import { Component, inject, OnInit } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { BagItemViewComponent } from '../../components/bag-item-view/bag-item-view.component';
import { BagItem, ItemMap } from '../../models/item.model';
import { RuntimeService } from '../../services/runtime.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NzTypographyModule, NzEmptyModule, BagItemViewComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.less'
})
export class ShopComponent implements OnInit {
  private rtSrv = inject(RuntimeService);

  bagItems: BagItem[] = [];

  get isShopShow() {
    return this.rtSrv.timeTick.value % 36 < 3;
  }

  ngOnInit() {
    this.bagItems = [
      {
        id: '40000',
        item: ItemMap['40000'],
        count: 100
      }
    ];
  }
}
