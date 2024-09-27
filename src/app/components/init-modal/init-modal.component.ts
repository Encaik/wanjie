import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Env, InitCharacter } from '@models';
import { EnvService } from '@services';
import { Generate } from '@utils/generate';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { LevelMapViewComponent } from '../level-map-view/level-map-view.component';

@Component({
  selector: 'app-init-modal',
  standalone: true,
  imports: [CommonModule, NzDescriptionsModule, NzStepsModule, NzTagModule, KeyValuePipe, LevelMapViewComponent],
  templateUrl: './init-modal.component.html'
})
export class InitModalComponent implements OnInit {
  public envSrv = inject(EnvService);
  private ref = inject(NzModalRef);
  current: number = 0;
  characters: InitCharacter[] = [];
  envs: Env[] = [];
  galaxiesId: string | undefined;
  selectCharacter: InitCharacter | undefined;
  selectEnv: Env | undefined;

  ngOnInit() {
    this.characters = Generate.characters(8);
    const { envs, galaxiesId } = Generate.envs(8);
    this.envs = envs;
    this.galaxiesId = galaxiesId;
  }

  onCharacterClick(item: InitCharacter) {
    this.current = 1;
    this.selectCharacter = item;
  }

  onEnvClick(item: Env) {
    this.selectEnv = item;
    this.ref.destroy({
      character: this.selectCharacter,
      env: {
        env: this.selectEnv,
        envNodes: this.envs,
        envEdges: [],
        galaxiesCombos: [{ id: this.galaxiesId }]
      }
    });
  }
}
