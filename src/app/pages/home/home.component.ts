import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { interval, Subscription } from 'rxjs';

import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { LogService } from '../../services/log.service';

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
    const addEnergy =
      100 * this.envSrv.weight +
      Math.round(Math.random() * this.characterSrv.skillInfo.energy * 0.01) +
      Math.round(Math.random() * 100 - 50);
    this.logSrv.log(`修炼获得${addEnergy}点能量\n`);
    const energy = this.characterSrv.skillInfo.energy + addEnergy;
    const level = Math.floor(energy / (1000 * this.envSrv.weight));
    if (level > this.characterSrv.skillInfo.level) {
      this.logSrv.log(`能量已满，请升级后再继续修炼\n`);
      this.isUpgrade = true;
      this.characterSrv.setSkillInfo({
        energy: energy - (energy % (1000 * this.envSrv.weight))
      });
      this.onAutoCultivationClick(false);
      return;
    }
    this.characterSrv.setSkillInfo({
      energy
    });
  }

  onAutoCultivationClick(status?: boolean) {
    this.isAutoCultivate = status ?? !this.isAutoCultivate;
    if (this.isAutoCultivate) {
      if (this.isUpgrade) {
        this.isAutoCultivate = false;
        this.logSrv.log('请先完成升级，然后才可以修炼\n');
        return;
      }
      this.logSrv.log('自动修炼开启\n');
      this.autoCultivateSub = interval(500).subscribe(() => {
        this.onCultivationClick();
      });
    } else {
      this.logSrv.log('自动修炼关闭\n');
      this.autoCultivateSub?.unsubscribe();
    }
  }

  onUpgradeClick() {
    if (!this.isUpgrade) return;
    this.isUpgrade = false;
    const level = this.characterSrv.skillInfo.level;
    this.logSrv.log(`恭喜你，你从${this.envSrv.levelMap[level]}升到了${this.envSrv.levelMap[level + 1]}\n`);
    this.characterSrv.setSkillInfo({
      level: level + 1
    });
    const addHp = 10 * this.envSrv.weight + Math.round(Math.random() * 10);
    const addMp = 10 * this.envSrv.weight + Math.round(Math.random() * 10);
    this.logSrv.log(`恭喜你，你获得了${addHp}点生命值和${addMp}点魔法值\n`);
    this.characterSrv.setBaseInfo({
      hp: this.characterSrv.baseInfo.hp + addHp,
      mp: this.characterSrv.baseInfo.mp + addMp,
      totalHp: this.characterSrv.baseInfo.totalHp + addHp,
      totalMp: this.characterSrv.baseInfo.totalMp + addMp
    });
  }
}
