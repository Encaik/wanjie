import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Env, InitCharacter } from '@models';
import { EnvService } from '@services';
import { GenerateService } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { LevelMapViewComponent } from '../level-map-view/level-map-view.component';

@Component({
  selector: 'app-init-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzStepsModule,
    NzTagModule,
    KeyValuePipe,
    LevelMapViewComponent,
    NzSpinModule
  ],
  templateUrl: './init-modal.component.html'
})
export class InitModalComponent implements OnInit {
  public envSrv = inject(EnvService);
  private ref = inject(NzModalRef);
  private generateSrv = inject(GenerateService);
  current: number = 0;
  characters: InitCharacter[] = [];
  envs: Env[] = [];
  galaxiesId: string | undefined;
  selectCharacter: InitCharacter | undefined;
  selectEnv: Env | undefined;
  story: string = '';

  ngOnInit() {
    this.getCharacterList(8);
    this.getEnvList(8);
  }

  getCharacterList(length: number) {
    this.generateSrv.getCharacterList(length).subscribe(res => {
      this.characters = res;
    });
  }

  getEnvList(length: number) {
    this.generateSrv.getEnvList(length).subscribe(({ envs, galaxiesId }) => {
      this.envs = envs;
      this.galaxiesId = galaxiesId;
    });
  }

  getStory(character: InitCharacter, env: Env) {
    this.generateSrv.getStory(character, env).subscribe(res => {
      this.story = res;
    });
  }

  onCharacterClick(item: InitCharacter) {
    this.current = 1;
    this.selectCharacter = item;
  }

  onEnvClick(item: Env) {
    this.current = 2;
    this.selectEnv = item;
    this.getStory(this.selectCharacter!, this.selectEnv!);
    // this.onSubmitClick();
  }

  onSubmitClick() {
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
