import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CharacterService } from '../../services/character.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { EnvService } from '../../services/env.service';

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

  onCultivationClick() {
    this.characterSrv.setSkillInfo({
      energy: this.characterSrv.skillInfo.energy + 100 * this.envSrv.env.weight,
    });
  }

  onUpgradeClick() {}
}
