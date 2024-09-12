import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { LevelMapViewComponent } from '../../components/level-map-view/level-map-view.component';
import { EnvType } from '../../models';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzDescriptionsModule, NzGridModule, KeyValuePipe, NzTagModule, LevelMapViewComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private envSrv = inject(EnvService);
  private characterSrv = inject(CharacterService);

  get env() {
    return this.envSrv;
  }

  get currentLevel() {
    return this.characterSrv.skillInfo.level;
  }

  getEnvType(type: EnvType | null) {
    return this.envSrv.getEnvType(type);
  }
}
