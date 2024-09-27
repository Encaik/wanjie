import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';

import { getItemLevelClass, Item, ItemLevelMap, ItemMap, RewardPool } from '@models';

@Component({
  selector: 'app-reward-item-view',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './reward-item-view.component.html',
  styleUrl: './reward-item-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardItemViewComponent implements OnInit {
  @Input() reward: RewardPool = [];

  rewardItems: Item[] = [];

  ItemLevelMap = ItemLevelMap;
  getItemLevelClass = getItemLevelClass;

  ngOnInit() {
    this.rewardItems = this.reward.map(item => ItemMap[item]);
  }
}
