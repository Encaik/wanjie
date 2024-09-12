import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { interval, Subscription } from 'rxjs';

import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { LogService } from '../../services/log.service';
import { LogType, LogLevel } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzSpaceModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);

  isAutoCultivate = false;
  isUpgrade = false;
  autoCultivateSub: Subscription | null = null;

  onCultivationClick() {
    this.characterSrv.cultivation().then(isUpgrade => {
      if (isUpgrade) {
        this.isUpgrade = true;
        this.onAutoCultivationClick(false);
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
      this.autoCultivateSub = interval(500).subscribe(() => {
        this.onCultivationClick();
      });
    } else {
      this.logSrv.log({
        msg: '自动修炼关闭\n',
        type: LogType.Character,
        level: LogLevel.Info
      });
      this.autoCultivateSub?.unsubscribe();
    }
  }

  onUpgradeClick() {
    if (!this.isUpgrade) return;
    this.isUpgrade = false;
    const level = this.characterSrv.skillInfo.level;
    this.logSrv.log({
      msg: `恭喜你，你从${this.envSrv.levelMap[level]}升到了${this.envSrv.levelMap[level + 1]}\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    this.characterSrv.setSkillInfo({
      level: level + 1
    });
    const addHp = 10 * this.envSrv.weight + Math.round(Math.random() * 10);
    const addMp = 10 * this.envSrv.weight + Math.round(Math.random() * 10);
    this.logSrv.log({
      msg: `恭喜你，你获得了${addHp}点生命值和${addMp}点魔法值\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    this.characterSrv.setBaseInfo({
      hp: this.characterSrv.baseInfo.hp + addHp,
      mp: this.characterSrv.baseInfo.mp + addMp,
      totalHp: this.characterSrv.baseInfo.totalHp + addHp,
      totalMp: this.characterSrv.baseInfo.totalMp + addMp
    });
  }
}
