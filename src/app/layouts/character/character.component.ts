import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { ProgressViewComponent } from '../../components/progress-view/progress-view.component';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NzTypographyModule, NzDescriptionsModule, NzProgressModule, NzTagModule, ProgressViewComponent],
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);

  get character() {
    return this.characterSrv.getCharacter();
  }

  getLevelByExp() {
    return this.envSrv.levelMap[this.character.levelInfo.level];
  }

  getPercent(current: number, total: number) {
    return Math.floor((current / total) * 100);
  }
}
