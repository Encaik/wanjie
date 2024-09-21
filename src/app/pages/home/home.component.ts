import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { interval, Subscription } from 'rxjs';

import { BattleModalComponent } from '../../components/battle-modal/battle-modal.component';
import { LogType, LogLevel, BattleCharacter } from '../../models';
import { CharacterService } from '../../services/character.service';
import { LogService } from '../../services/log.service';
import { RuntimeService } from '../../services/runtime.service';
import { Generate } from '../../utils/generate';
import { BackpackComponent } from './components/backpack/backpack.component';
import { EnvService } from '../../services/env.service';
import { BackpackService } from '../../services/backpack.service';
import { ItemMap } from '../../models/item.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzSpaceModule, NzModalModule, NzTypographyModule, NzDividerModule, BackpackComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  private characterSrv = inject(CharacterService);
  private logSrv = inject(LogService);
  private rtSrv = inject(RuntimeService);
  private modal = inject(NzModalService);
  public envSrv = inject(EnvService);
  private backpackSrv = inject(BackpackService);

  isAutoCultivate = false;
  isUpgrade = false;
  autoCultivateSub: Subscription | null = null;
  enemys: BattleCharacter[] = [];

  ngOnInit() {
    this.enemys = Generate.enemys(8, this.characterSrv.levelInfo.level);
  }

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
    this.characterSrv.upgrade();
    this.isUpgrade = false;
    this.rtSrv.nextTimeTick();
  }

  onBattleClick(enemy: BattleCharacter) {
    const modal = this.modal.create({
      nzTitle: '战斗',
      nzContent: BattleModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzWidth: '1000px',
      nzMaskClosable: false
    });
    modal.afterClose.subscribe((isWin: boolean) => {
      if (isWin) {
        this.characterSrv.setStatusInfo({
          hp: this.characterSrv.attrInfo.hp
        });
        this.enemys = this.enemys.filter(item => item.id !== enemy.id);
        this.enemys.push(...Generate.enemys(1, this.characterSrv.levelInfo.level));
        const dropItem = ItemMap['40000'];
        this.backpackSrv.addItem(dropItem, 1);
        this.logSrv.log({
          msg: `获得${dropItem.name} * 1`,
          type: LogType.Item,
          level: LogLevel.Info
        });
      } else {
        this.enemys.forEach(item => {
          item.statusInfo.hp = item.attrInfo.hp;
          item.statusInfo.mp = item.attrInfo.mp;
        });
      }
    });
    const instance = modal.getContentComponent();
    instance.leftCharacters = [this.characterSrv.getCharacter()];
    instance.rightCharacters = [enemy];
  }
}
