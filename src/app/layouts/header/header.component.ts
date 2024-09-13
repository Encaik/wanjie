import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { LevelMapViewComponent } from '../../components/level-map-view/level-map-view.component';
import { EnvType } from '../../models';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RuntimeService } from '../../services/runtime.service';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzDescriptionsModule, NzGridModule, KeyValuePipe, TimeFormatPipe, NzTagModule, NzButtonModule, LevelMapViewComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public envSrv = inject(EnvService);
  private characterSrv = inject(CharacterService);
  private rtSrv = inject(RuntimeService);

  get timeTick() {
    return this.rtSrv.timeTick.value;
  }

  get env() {
    return this.envSrv;
  }

  get currentLevel() {
    return this.characterSrv.skillInfo.level;
  }

  onSaveClick() {
    this.rtSrv.save();
  }

  onDeleteClick() {
    this.rtSrv.delete().subscribe(() => {
      window.location.reload();
    });
  }
}
