import { Component, Input, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { BattleInfo, BattleStatusInfo, Character } from '../../models';

@Component({
  selector: 'app-battle-modal',
  standalone: true,
  imports: [NzDescriptionsModule, NzProgressModule],
  templateUrl: './battle-modal.component.html'
})
export class BattleModalComponent implements OnInit {
  @Input() leftCharacters: Character[] = [];
  @Input() rightCharacters: Character[] = [];

  leftTotalData: BattleStatusInfo = {
    hp: 0,
    mp: 0,
    totalHp: 0,
    totalMp: 0,
    buffs: []
  };
  rightTotalData: BattleStatusInfo = {
    hp: 0,
    mp: 0,
    totalHp: 0,
    totalMp: 0,
    buffs: []
  };
  attackQueue: Character[] = [];
  battleInfo: BattleInfo = {
    round: 1
  };
  battleLogs: string[] = [];

  ngOnInit() {
    this.leftCharacters.forEach(item => {
      this.leftTotalData.hp += item.statusInfo.hp;
      this.leftTotalData.mp += item.statusInfo.mp;
      this.leftTotalData.totalHp += item.attrInfo.hp;
      this.leftTotalData.totalMp += item.attrInfo.mp;
    });
    this.rightCharacters.forEach(item => {
      this.rightTotalData.hp += item.statusInfo.hp;
      this.rightTotalData.mp += item.statusInfo.mp;
      this.rightTotalData.totalHp += item.attrInfo.hp;
      this.rightTotalData.totalMp += item.attrInfo.mp;
    });
    this.attackQueue = this.leftCharacters.concat(this.rightCharacters).sort((a, b) => b.attrInfo.speed - a.attrInfo.speed);
    this.battleStart();
  }

  battleStart() {
    for (let index = 0; index < 10; index++) {
      this.battleLogs.push(`第${this.battleInfo.round}回合`);
      this.attackQueue.forEach(item => {
        this.battleLogs.push(`${item.baseInfo.name}攻击`);
      });
      this.attackQueue = this.leftCharacters.concat(this.rightCharacters).sort((a, b) => b.attrInfo.speed - a.attrInfo.speed);
      this.battleInfo.round++;
    }
  }

  getPercent(current: number, total: number) {
    return Math.floor((current / total) * 100);
  }
}
