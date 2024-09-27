import { Character } from './character.model';
import { Env } from './env.model';
import { BagItem } from './item.model';

export interface StorageData {
  timeTickData: number; // 时间刻
  characterData: Character; // 角色信息
  envData: Env; // 环境信息
  backpackData: BagItem[]; // 背包信息
  taskData: string; // 任务信息
}
