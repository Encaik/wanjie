import { KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { BaseInfo, Env, EnvType } from '../../model';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { Generate } from '../../utils/generate';
import { LevelMapViewComponent } from '../level-map-view/level-map-view.component';

@Component({
  selector: 'app-init-modal',
  standalone: true,
  imports: [NzCardModule, NzDescriptionsModule, NzStepsModule, NzTagModule, KeyValuePipe, LevelMapViewComponent],
  templateUrl: './init-modal.component.html',
  styleUrl: './init-modal.component.less'
})
export class InitModalComponent implements OnInit {
  private ref = inject(NzModalRef);
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  current: number = 0;
  characters: Array<Pick<BaseInfo, 'name' | 'gender' | 'age' | 'ability'>> = [];
  envs: Array<Pick<Env, 'name' | 'levelMap' | 'weight' | 'maxEnergy'>> = [];

  ngOnInit() {
    this.characters = Generate.characters(8);
    this.envs = Generate.envs(8);
  }

  onCharacterClick(item: Pick<BaseInfo, 'name' | 'gender' | 'age' | 'ability'>) {
    this.current = 1;
    this.characterSrv.setBaseInfo(item);
  }

  onEnvClick(item: Pick<Env, 'name' | 'levelMap' | 'weight' | 'maxEnergy'>) {
    this.envSrv.setEnv({
      type: EnvType.Base,
      ...item
    });
    this.ref.destroy();
  }
}
