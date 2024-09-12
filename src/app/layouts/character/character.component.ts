import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NzTypographyModule, NzDescriptionsModule, NzProgressModule],
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);

  get character() {
    return this.characterSrv.getCharacter();
  }

  getLevelByEnergy() {
    return this.envSrv.levelMap[this.character.skillInfo.level];
  }

  getPercent(current: number, total: number) {
    return Math.floor((current / total) * 100);
  }
}
