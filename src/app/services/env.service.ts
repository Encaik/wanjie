import { Injectable } from '@angular/core';

import { Env, EnvType, MethodSuit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  name: string = '未知世界';
  type: EnvType | null = null;
  levelMap: Record<number, string> = {};
  maxExp: number = 0;
  weight: number = 1;
  methodSuits: MethodSuit[] = [];
  envNodes: Env[] = [];
  envEdges: Array<{ source: string; target: string }> = [];
  galaxiesCombos: Array<{ id: string; combo?: string }> = [];

  addEnvGraph(envList: Env[], galaxiesId: string) {
    this.envNodes.push(...envList);
    this.galaxiesCombos.push({ id: galaxiesId });
  }

  setEnv(env: any) {
    this.name = env.env.name;
    this.type = env.env.type;
    this.levelMap = env.env.levelMap;
    this.maxExp = env.env.maxExp;
    this.weight = env.env.weight;
    this.methodSuits = env.env.methodSuits || [];
    this.envNodes = env.envNodes || [];
    this.envEdges = env.envEdges || [];
    this.galaxiesCombos = env.galaxiesCombos || [];
  }

  getEnv() {
    return {
      env: {
        name: this.name,
        type: this.type,
        levelMap: this.levelMap,
        maxExp: this.maxExp,
        weight: this.weight
      },
      envNodes: this.envNodes,
      envEdges: this.envEdges,
      galaxiesCombos: this.galaxiesCombos
    };
  }

  getEnvType(type: EnvType | null) {
    switch (type) {
      case EnvType.XianXia:
        return '仙侠世界';
      case EnvType.Magic:
        return '魔法世界';
      case EnvType.Fantasy:
        return '幻想世界';
      case EnvType.Technology:
        return '科技世界';
      case EnvType.Modern:
        return '现代世界';
      case EnvType.Imperial:
        return '帝国世界';
      case EnvType.Adventure:
        return '冒险世界';
      default:
        return '未知世界';
    }
  }
}
