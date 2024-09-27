import { Component, inject, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { ProgressViewComponent } from '@components/progress-view/progress-view.component';
import { CharacterService, EnvService, TimeTickService } from '@services';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NzTypographyModule, NzDescriptionsModule, NzProgressModule, NzTagModule, ProgressViewComponent],
  templateUrl: './character.component.html'
})
export class CharacterComponent implements OnInit {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  private timeTickSrv = inject(TimeTickService);

  get character() {
    return this.characterSrv.getCharacter();
  }

  ngOnInit() {
    this.timeTickSrv.timeTick$.subscribe(timeTick => {
      if (timeTick % 36 === 0) {
        this.characterSrv.setBaseInfo({
          age: this.characterSrv.baseInfo.age + 1
        });
      }
    });
  }

  getLevelByExp() {
    return this.envSrv.levelMap[this.character.levelInfo.level];
  }

  getPercent(current: number, total: number) {
    return Math.floor((current / total) * 100);
  }
}
