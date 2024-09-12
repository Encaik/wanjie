import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { BaseInfo, Env } from '../../models';
import { Generate } from '../../utils/generate';
import { LevelMapViewComponent } from '../level-map-view/level-map-view.component';
import { EnvService } from '../../services/env.service';

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
  characters: Array<Pick<BaseInfo, 'id' | 'name' | 'gender' | 'age' | 'ability'>> = [];
  envs: Env[] = [];
  selectCharacter: BaseInfo | undefined;
  selectEnv: Env | undefined;

  ngOnInit() {
    this.characters = Generate.characters(8);
    this.envs = Generate.envs(8);
  }

  onCharacterClick(item: Pick<BaseInfo, 'id' | 'name' | 'gender' | 'age' | 'ability'>) {
    this.current = 1;
    this.selectCharacter = {
      ...item,
      hp: 100,
      mp: 100
    };
  }

  onEnvClick(item: Env) {
    this.selectEnv = item;
    this.ref.destroy({
      character: this.selectCharacter,
      env: this.selectEnv
    });
  }
}
