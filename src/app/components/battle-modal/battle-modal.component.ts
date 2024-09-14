import { Component, Input, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { interval, Subscription, takeWhile } from 'rxjs';

import { BattleCharacter, BattleInfo, BattleStatusInfo } from '../../models';

@Component({
  selector: 'app-battle-modal',
  standalone: true,
  imports: [NzDescriptionsModule, NzProgressModule],
  templateUrl: './battle-modal.component.html'
})
export class BattleModalComponent implements OnInit {
  @Input() leftCharacters: BattleCharacter[] = [];
  @Input() rightCharacters: BattleCharacter[] = [];

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
  attackQueue: BattleCharacter[] = [];
  battleInfo: BattleInfo = {
    round: 1
  };
  battleLogs: string[] = [];
  timer: Subscription | undefined;

  ngOnInit() {
    this.updateAttackQueue();
    this.battleStart();
  }

  updateStatusInfo() {
    const initData: BattleStatusInfo = {
      hp: 0,
      mp: 0,
      totalHp: 0,
      totalMp: 0,
      buffs: []
    };
    const reduceFun = (total: BattleStatusInfo, cur: BattleCharacter) => {
      total.hp += cur.statusInfo.hp;
      total.mp += cur.statusInfo.mp;
      total.totalHp += cur.attrInfo.hp;
      total.totalMp += cur.attrInfo.mp;
      return total;
    };
    this.leftTotalData = this.leftCharacters.reduce(reduceFun, { ...initData });
    this.rightTotalData = this.rightCharacters.reduce(reduceFun, { ...initData });
  }

  battleStart() {
    this.timer = interval(500)
      .pipe(takeWhile(() => this.attackQueue.length > 0))
      .subscribe(() => {
        while (this.attackQueue.length) {
          const currentCharacter = this.attackQueue.shift();
          if (!currentCharacter || currentCharacter?.statusInfo.hp === 0) continue;
          let targetCharacter = undefined;
          if (this.leftCharacters.findIndex(item => item.id === currentCharacter?.id) > -1) {
            targetCharacter = this.rightCharacters[Math.floor(Math.random() * this.rightCharacters.length)];
          } else if (this.rightCharacters.findIndex(item => item.id === currentCharacter?.id) > -1) {
            targetCharacter = this.leftCharacters[Math.floor(Math.random() * this.leftCharacters.length)];
          } else {
            this.timer?.unsubscribe();
            return;
          }
          this.battle(currentCharacter, targetCharacter);
          this.updateStatusInfo();
        }
        this.battleEnd().then(nextRound => {
          nextRound && this.updateAttackQueue();
        });
      });
  }

  battle(currentCharacter: BattleCharacter, targetCharacter: BattleCharacter) {
    this.battleLogs.push(
      `${this.getName(currentCharacter)} 攻击 ${this.getName(targetCharacter)}, 造成 ${currentCharacter!.attrInfo.attack} 点伤害`
    );
    targetCharacter!.statusInfo.hp -= currentCharacter!.attrInfo.attack;
    if (targetCharacter!.statusInfo.hp <= 0) {
      targetCharacter!.statusInfo.hp = 0;
      this.battleLogs.push(`${targetCharacter?.baseInfo.name} 死亡`);
    }
  }

  battleEnd(): Promise<boolean> {
    const leftLivers = this.leftCharacters.filter(i => i.statusInfo.hp !== 0);
    const rightLivers = this.rightCharacters.filter(i => i.statusInfo.hp !== 0);
    if (!leftLivers.length || !rightLivers.length) {
      this.timer?.unsubscribe();
      this.battleLogs.push(`${leftLivers.length ? '我方' : '敌方'}胜利`);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  updateAttackQueue() {
    this.battleLogs.push(`第 ${this.battleInfo.round} 回合：`);
    this.attackQueue = [...this.leftCharacters, ...this.rightCharacters]
      .filter(item => item.statusInfo.hp !== 0)
      .sort((a, b) => b.attrInfo.speed - a.attrInfo.speed);
    this.battleInfo.round++;
  }

  getPercent(current: number, total: number) {
    return Math.floor((current / total) * 100);
  }

  getName(character: BattleCharacter) {
    return `<span class='${character?.isEnemy ? 'text-red-500' : 'text-green-500'}'>${character?.baseInfo.name}</span>`;
  }
}
