import { Component, inject } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BaseInfo, Env, EnvType } from '../../model';
import { CharacterService } from '../../services/character.service';
import { EnvService } from '../../services/env.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-init-modal',
  standalone: true,
  imports: [
    NzCardModule,
    NzDescriptionsModule,
    NzStepsModule,
    NzTagModule,
    KeyValuePipe,
  ],
  templateUrl: './init-modal.component.html',
  styleUrl: './init-modal.component.less',
})
export class InitModalComponent {
  private ref = inject(NzModalRef);
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);
  current: number = 0;
  characters: Pick<BaseInfo, 'name' | 'gender' | 'age' | 'ability'>[] = [];
  envs: Pick<Env, 'name' | 'levelMap' | 'weight' | 'maxEnergy'>[] = [];

  ngOnInit() {
    this.generateCharacter();
    this.generateEnv();
  }

  sort() {
    return 0;
  }

  generateCharacter() {
    this.characters = Array.from({ length: 8 }, (_, i) => ({
      name: `姓名${i + 1}`,
      gender: Math.random() > 0.5 ? '男' : '女',
      age: Math.floor(Math.random() * 100),
      ability: '特质' + Math.floor(Math.random() * 100),
    }));
  }

  generateEnv() {
    this.envs = Array.from({ length: 8 }, (_, i) => ({
      name: `世界${i + 1}`,
      levelMap: {
        0: '新手',
        1: '初级',
        2: '中级',
        3: '高级',
        4: '专家',
        5: '王者',
        6: '宗师',
        7: '至尊',
        8: '无尽',
        9: '终极',
        10: '传说',
      },
      weight: 1,
      maxEnergy: 10000,
    }));
  }

  onCharacterClick(
    item: Pick<BaseInfo, 'name' | 'gender' | 'age' | 'ability'>
  ) {
    this.current = 1;
    this.characterSrv.setBaseInfo(item);
  }

  onEnvClick(item: Pick<Env, 'name' | 'levelMap' | 'weight' | 'maxEnergy'>) {
    this.envSrv.setEnv({
      type: EnvType.Base,
      ...item,
    });
    this.ref.destroy();
  }
}
