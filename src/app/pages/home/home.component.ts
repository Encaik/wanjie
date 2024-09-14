import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { interval, Subscription } from 'rxjs';

import { LogType, LogLevel } from '../../models';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { LogService } from '../../services/log.service';
import { RuntimeService } from '../../services/runtime.service';
import { BackpackComponent } from './components/backpack/backpack.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzSpaceModule, NzTypographyModule, NzDividerModule, BackpackComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);
  private rtSrv = inject(RuntimeService);

  isAutoCultivate = false;
  isUpgrade = false;
  autoCultivateSub: Subscription | null = null;

  onCultivationClick() {
    this.characterSrv.cultivation().then(isUpgrade => {
      this.rtSrv.nextTimeTick();
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
    const level = this.characterSrv.levelInfo.level;
    this.logSrv.log({
      msg: `恭喜你，你从${this.envSrv.levelMap[level]}升到了${this.envSrv.levelMap[level + 1]}\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    this.characterSrv.setLevelInfo({
      level: level + 1
    });
    const addHp = Math.round(this.envSrv.weight * this.characterSrv.skillInfo.hp);
    const addMp = Math.round(this.envSrv.weight * this.characterSrv.skillInfo.mp);
    this.logSrv.log({
      msg: `恭喜你，你获得了${addHp}点生命和${addMp}点灵力\n`,
      type: LogType.Character,
      level: LogLevel.Info
    });
    this.characterSrv.setAttrInfo({
      hp: this.characterSrv.attrInfo.hp + addHp,
      mp: this.characterSrv.attrInfo.mp + addMp
    });
    this.rtSrv.nextTimeTick();
  }
}
