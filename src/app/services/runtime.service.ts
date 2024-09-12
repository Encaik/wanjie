import { inject, Injectable } from '@angular/core';
import { CharacterService } from './character.service';
import { EnvService } from './env.service';
import { BaseInfo, Env } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {
  private characterSrv = inject(CharacterService);
  private envSrv = inject(EnvService);

  init(character: BaseInfo, env: Env) {
    this.characterSrv.setBaseInfo(character);
    this.envSrv.setEnv(env);
  }
}
