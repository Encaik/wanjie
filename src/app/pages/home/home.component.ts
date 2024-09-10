import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CharacterService } from '../../services/character.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { EnvService } from '../../services/env.service';
import { LogService } from '../../services/log.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonModule, NzSpaceModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private logSrv = inject(LogService);

  isAutoCultivate = false;
  autoCultivateSub: Subscription | null = null;

  onCultivationClick() {
    const addEnergy =
      100 * this.envSrv.env.weight + Math.round(Math.random() * 100 - 50);
    this.logSrv.log(`修炼获得${addEnergy}点能量\n`);
    const energy = this.characterSrv.skillInfo.energy + addEnergy;
    const level = Math.floor(energy / (1000 * this.envSrv.env.weight));
    if (level > this.characterSrv.skillInfo.level) {
      this.logSrv.log(
        `恭喜你，你从${
          this.envSrv.env.levelMap[this.characterSrv.skillInfo.level]
        }升到了${this.envSrv.env.levelMap[level]}\n`
      );
      const addHp =
        10 * this.envSrv.env.weight + Math.round(Math.random() * 10);
      const addMp =
        10 * this.envSrv.env.weight + Math.round(Math.random() * 10);
      this.logSrv.log(`恭喜你，你获得了${addHp}点生命值和${addMp}点魔法值\n`);
      this.characterSrv.setBaseInfo({
        hp: this.characterSrv.baseInfo.hp + addHp,
        mp: this.characterSrv.baseInfo.mp + addMp,
        totalHp: this.characterSrv.baseInfo.totalHp + addHp,
        totalMp: this.characterSrv.baseInfo.totalMp + addMp,
      });
    }
    this.characterSrv.setSkillInfo({
      energy,
      level,
    });
  }

  onAutoCultivationClick() {
    this.isAutoCultivate = !this.isAutoCultivate;
    if (this.isAutoCultivate) {
      this.logSrv.log('自动修炼开启\n');
      this.autoCultivateSub = interval(500).subscribe(() => {
        this.onCultivationClick();
      });
    } else {
      this.logSrv.log('自动修炼关闭\n');
      this.autoCultivateSub?.unsubscribe();
    }
  }

  onUpgradeClick() {}
}
