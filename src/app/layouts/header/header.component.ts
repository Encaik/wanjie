import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { LevelMapViewComponent } from '@components/level-map-view/level-map-view.component';
import { TimeFormatPipe } from '@pipes/time-format.pipe';
import { EnvService, CharacterService, TimeTickService, RuntimeService } from '@services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzDescriptionsModule, NzGridModule, KeyValuePipe, TimeFormatPipe, NzTagModule, NzButtonModule, LevelMapViewComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public envSrv = inject(EnvService);
  private characterSrv = inject(CharacterService);
  private timeTickSrv = inject(TimeTickService);
  private rtSrv = inject(RuntimeService);

  get timeTick() {
    return this.timeTickSrv.getTimeTick();
  }

  get env() {
    return this.envSrv;
  }

  get currentLevel() {
    return this.characterSrv.levelInfo.level;
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
