import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NzTypographyModule, NzDescriptionsModule, NzProgressModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.less',
})
export class CharacterComponent {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);

  get character() {
    return this.characterSrv.getCharacter();
  }

  getLevelByEnergy(energy: number) {
    return this.envSrv.env.levelMap[
      Math.floor(energy / (1000 * this.envSrv.env.weight))
    ];
  }

  getPercent(current: number, total: number) {
    return Math.floor((current / total) * 100);
  }
}
