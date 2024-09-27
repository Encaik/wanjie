import { Component, inject, OnInit } from '@angular/core';
import { BagItemViewComponent } from '@components/bag-item-view/bag-item-view.component';
import { BagItem, ItemMap } from '@models';
import { TimeTickService } from '@services';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NzTypographyModule, NzEmptyModule, BagItemViewComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.less'
})
export class ShopComponent implements OnInit {
  private timeTickSrv = inject(TimeTickService);

  bagItems: BagItem[] = [];

  get isShopShow() {
    return this.timeTickSrv.getTimeTick() % 36 < 3;
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
