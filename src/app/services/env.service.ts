import { Injectable } from '@angular/core';
import { Env, EnvType } from '../model';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  env: Env = {
    name: '新手村',
    type: EnvType.Base,
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
    maxEnergy: 10000,
    weight: 1,
  };

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
