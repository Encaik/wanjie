import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { EnvService } from '../../services/env.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { KeyValuePipe } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EnvType } from '../../model';
import { CharacterService } from '../../services/character.service';
import { LevelMapViewComponent } from '../../components/level-map-view/level-map-view.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzDescriptionsModule,
    NzGridModule,
    KeyValuePipe,
    NzTagModule,
    LevelMapViewComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
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
