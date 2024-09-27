import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BattleCharacter, BattleStatusInfo } from '@models';
import { EnvService } from '@services';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { BehaviorSubject, from, map, mergeMap, Subscription, timer } from 'rxjs';

import { ProgressViewComponent } from '../progress-view/progress-view.component';

@Component({
  selector: 'app-battle-modal',
  standalone: true,
  imports: [CommonModule, NzDescriptionsModule, ProgressViewComponent, NzSpaceModule, NzButtonModule],
  templateUrl: './battle-modal.component.html'
})
export class BattleModalComponent implements OnInit {
  private envSrv = inject(EnvService);
  private ref = inject(NzModalRef);

  @Input() leftCharacters: BattleCharacter[] = [];
  @Input() rightCharacters: BattleCharacter[] = [];

  round$: BehaviorSubject<number> = new BehaviorSubject(0);

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
  battleLogs: string[] = [];
  queue$: Subscription | undefined;
  isBattleEnd: boolean = false;

  ngOnInit() {
    this.updateStatusInfo();
    this.battleStart();
    this.roundProcess();
  }

  roundProcess() {
    this.round$.subscribe((roundNum: number) => {
      if (!roundNum) return;
      this.battleLogs.push(`第 ${roundNum} 回合：`);
      this.queue$ = from(this.attackQueue)
        .pipe(
          mergeMap(
            currentCharacter =>
              timer(500).pipe(
                map(() => {
                  if (currentCharacter.statusInfo.hp <= 0) return;
                  return { currentCharacter, targetCharacter: this.getTargetCharacter(currentCharacter) };
                })
              ),
            1
          )
        )
        .subscribe({
          next: res => {
            if (res && res.targetCharacter) this.battle(res.currentCharacter, res.targetCharacter);
            this.updateStatusInfo();
          },
          complete: () => {
            this.battleEnd().then(nextRound => {
              if (nextRound) {
                setTimeout(() => {
                  this.updateAttackQueue();
                }, 500);
              } else {
                this.isBattleEnd = true;
              }
            });
          }
        });
    });
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

  updateAttackQueue() {
    this.attackQueue = [...this.leftCharacters, ...this.rightCharacters]
      .filter(item => item.statusInfo.hp !== 0)
      .sort((a, b) => b.attrInfo.speed - a.attrInfo.speed);
    this.round$.next(this.round$.value + 1);
  }

  getTargetCharacter(currentCharacter: BattleCharacter) {
    let targetCharacter: BattleCharacter | undefined;
    if (currentCharacter.isEnemy) {
      targetCharacter = this.leftCharacters[Math.floor(Math.random() * this.rightCharacters.length)];
    } else {
      targetCharacter = this.rightCharacters[Math.floor(Math.random() * this.leftCharacters.length)];
    }
    return targetCharacter;
  }

  battleStart() {
    timer(500).subscribe(() => {
      this.updateAttackQueue();
    });
  }

  battle(currentCharacter: BattleCharacter, targetCharacter: BattleCharacter) {
    if (this.isBattleEnd) return;
    this.battleLogs.push(
      `${this.getName(currentCharacter)}(${this.envSrv.levelMap[currentCharacter.levelInfo.level]}) 攻击 ${this.getName(targetCharacter)}(${this.envSrv.levelMap[targetCharacter.levelInfo.level]}), 造成 ${currentCharacter!.attrInfo.attack} 点伤害`
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
      this.battleLogs.push(`${leftLivers.length ? '我方' : '敌方'}胜利`);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  onConfirmClick() {
    this.queue$?.unsubscribe();
    this.ref.destroy(this.leftCharacters.filter(i => i.statusInfo.hp !== 0).length);
  }

  onRunClick() {
    this.queue$?.unsubscribe();
    this.isBattleEnd = true;
    this.ref.destroy(false);
  }

  getName(character: BattleCharacter) {
    return `<span class='${character?.isEnemy ? 'text-red-500' : 'text-green-500'}'>${character?.baseInfo.name}</span>`;
  }
}
