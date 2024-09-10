import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { EnvService } from '../../services/env.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { KeyValuePipe } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EnvType } from '../../model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzDescriptionsModule, NzGridModule, KeyValuePipe, NzTagModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {
  private envSrv = inject(EnvService);
  private characterSrv = inject(CharacterService);

  get env() {
    return this.envSrv.env;
  }

  getEnvType(type: EnvType) {
    return this.envSrv.getEnvType(type);
  }

  getHightLightLevel(level: string) {
    return this.characterSrv.skillInfo.level === Number(level)
      ? 'blue'
      : 'default';
  }

  sort() {
    return 0;
  }
}
