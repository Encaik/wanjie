import { Injectable } from '@angular/core';
import { Env, EnvType } from '../model';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  name: string = '';
  type: EnvType = EnvType.Base;
  levelMap: Record<number, string> = {};
  maxEnergy: number = 0;
  weight: number = 0;

  setEnv(env: Env) {
    this.name = env.name;
    this.type = env.type;
    this.levelMap = env.levelMap;
    this.maxEnergy = env.maxEnergy;
    this.weight = env.weight;
  }

  getEnvType(type: EnvType) {
    switch (type) {
      case EnvType.Base:
        return '新手世界';
      case EnvType.XianXia:
        return '仙侠世界';
      case EnvType.Magic:
        return '魔法世界';
      case EnvType.Fantasy:
        return '幻想世界';
      case EnvType.Technology:
        return '科技世界';
      default:
        return '未知世界';
    }
  }
}
