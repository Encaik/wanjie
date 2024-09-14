import { Character, StatusInfo } from './character.model';

export type BattleStatusInfo = StatusInfo & { totalHp: number; totalMp: number };

export interface BattleInfo {
  round: number;
}

export type BattleCharacter = Omit<Character, 'skillInfo'> & { isEnemy?: boolean };
