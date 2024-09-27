import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { LogType, LogLevel, BattleCharacter, CharacterEventOperate, EventType, EventRes } from '@models';
import { Generate } from '@utils/generate';
import { BackpackComponent } from './components/backpack/backpack.component';
import { CharacterService, LogService, RuntimeService, BattleService, EnvService, BackpackService, EventService } from '@services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, NzTypographyModule, NzDividerModule, BackpackComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  private characterSrv = inject(CharacterService);
  private logSrv = inject(LogService);
  private rtSrv = inject(RuntimeService);
  private battleSrv = inject(BattleService);
  public envSrv = inject(EnvService);
  private backpackSrv = inject(BackpackService);
  private event = inject(EventService);

  isAutoCultivate = false;
  isUpgrade = false;
  isLocked = false;
  enemys: BattleCharacter[] = [];

  ngOnInit() {
    // TODO: 初始化8个敌人，用来测试战斗
    this.enemys = Generate.enemys(8, this.characterSrv.levelInfo.level);
    // 初始化升级状态
    this.isUpgrade = this.characterSrv.canUpgrade;
  }

  onCultivationClick() {
    this.isLocked = true;
    this.event
      .sendEvent({
        type: EventType.Character,
        operate: CharacterEventOperate.Cultivation,
        data: null
      })
      .subscribe((res: EventRes) => {
        if (res.status === 'success') {
          this.isLocked = false;
          if (res.data) {
            this.isUpgrade = true;
            this.onAutoCultivationClick(false);
          }
          if (this.isAutoCultivate) this.onCultivationClick();
        } else {
          this.logSrv.log({
            msg: '修炼失败',
            type: LogType.Character,
            level: LogLevel.Info
          });
        }
      });
  }

  onAutoCultivationClick(status?: boolean) {
    this.isAutoCultivate = status ?? !this.isAutoCultivate;
    if (this.isAutoCultivate) {
      if (this.isUpgrade) {
        this.isAutoCultivate = false;
        this.logSrv.log({
          msg: '请先完成升级，然后才可以修炼\n',
          type: LogType.Character,
          level: LogLevel.Info
        });
        return;
      }
      this.logSrv.log({
        msg: '自动修炼开启\n',
        type: LogType.Character,
        level: LogLevel.Info
      });
      this.onCultivationClick();
    } else {
      this.logSrv.log({
        msg: '自动修炼关闭\n',
        type: LogType.Character,
        level: LogLevel.Info
      });
    }
  }

  onUpgradeClick() {
    if (!this.isUpgrade) return;
    this.event
      .sendEvent({
        type: EventType.Character,
        operate: CharacterEventOperate.Upgrade,
        data: null
      })
      .subscribe((res: EventRes) => {
        if (res.status === 'success') {
          this.isUpgrade = false;
        }
      });
  }

  onBattleClick(enemy: BattleCharacter) {
    const modal = this.battleSrv.createBattleModal();
    modal.afterClose.subscribe((isWin: boolean) => {
      if (isWin) {
        this.characterSrv.setStatusInfo({
          hp: this.characterSrv.attrInfo.hp
        });
        this.enemys = this.enemys.filter(item => item.id !== enemy.id);
        this.enemys.push(...Generate.enemys(1, this.characterSrv.levelInfo.level));
        this.backpackSrv.addRewardItems([
          {
            id: '40000',
            count: 1
          },
          {
            id: '1',
            count: Math.round(Math.random() * 100)
          }
        ]);
      } else {
        this.enemys.forEach(item => {
          item.statusInfo.hp = item.attrInfo.hp;
          item.statusInfo.mp = item.attrInfo.mp;
        });
      }
      this.rtSrv.save();
    });
    const instance = modal.getContentComponent();
    instance.leftCharacters = [this.characterSrv.getCharacter()];
    instance.rightCharacters = [enemy];
  }
}
