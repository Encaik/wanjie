import { v4 as uuidv4 } from 'uuid';

import LEVELMAP from '../assets/data/level-map.json';
import NAMES from '../assets/data/names.json';
import SURNAMES from '../assets/data/surnames.json';
import TALENTS from '../assets/data/talents.json';
import WORLDS from '../assets/data/worlds.json';
import { Character, CharacterTalent, Env, EnvType, InitCharacter } from '../models';

const SURNAMES_LEN = SURNAMES.length;
const NAMES_LEN = NAMES.length;
const WORLDS_LEN = WORLDS.length;
const TALENTS_LEN = TALENTS.length;

/**
 * 生成相关数据的静态类
 */
export class Generate {
  /**
   * 生成指定数量的角色
   *
   * @param length 角色数量
   * @returns 角色数组，包含每个角色的名字、性别、年龄和能力特质
   */
  static characters(length: number): InitCharacter[] {
    // TODO: 完善特质体系及相关逻辑
    return Array.from({ length }, (_, i) => ({
      id: `character-${uuidv4()}`,
      baseInfo: {
        name: getCharacterName(),
        gender: Math.random() > 0.5 ? '男' : '女',
        age: Math.floor(Math.random() * 10) * 2 + 12,
        talent: getCharacterTalent(1)
      },
      skillInfo: {
        hp: Math.round(Math.random() * 40) + 100,
        mp: Math.round(Math.random() * 40) + 100,
        attack: Math.round(Math.random() * 40) + 20,
        defence: Math.round(Math.random() * 40) + 20,
        speed: Math.round(Math.random() * 40)
      }
    }));
  }

  static enemys(length: number): Character[] {
    return Array.from({ length }, (_, i) => ({
      id: `enemy-${uuidv4()}`,
      baseInfo: {
        name: getCharacterName(),
        gender: Math.random() > 0.5 ? '男' : '女',
        age: Math.floor(Math.random() * 10) * 2 + 12,
        talent: getCharacterTalent(1)
      },
      statusInfo: {
        hp: Math.round(Math.random() * 40) + 100,
        mp: Math.round(Math.random() * 40) + 100,
        buffs: []
      },
      skillInfo: {
        hp: Math.round(Math.random() * 40) + 100,
        mp: Math.round(Math.random() * 40) + 100,
        attack: Math.round(Math.random() * 40) + 20,
        defence: Math.round(Math.random() * 40) + 20,
        speed: Math.round(Math.random() * 40)
      },
      levelInfo: {
        energy: Math.round(Math.random() * 1000),
        level: 0
      },
      attrInfo: {
        hp: Math.round(Math.random() * 40) + 100,
        mp: Math.round(Math.random() * 40) + 100,
        attack: Math.round(Math.random() * 40) + 20,
        defence: Math.round(Math.random() * 40) + 20,
        speed: Math.round(Math.random() * 40),
        critRate: Math.round(Math.random() * 5) + 2,
        critDamage: Math.round(Math.random() * 20) + 10
      }
    }));
  }

  static envs(length: number): { envs: Env[]; galaxiesId: string } {
    const galaxiesId = generateId();
    // TODO: 等级体系随机选中一套预设，并完善预设等级数量不同时的其他参数
    return {
      envs: Array.from({ length }, (_, i) => {
        const weight: number = Number((Math.random() * 0.5 + 0.75).toFixed(2));
        const type: EnvType = Object.values(EnvType)[Math.floor(Math.random() * Object.keys(EnvType).length)];
        return {
          id: `env-${uuidv4()}`,
          name: WORLDS[Math.floor(Math.random() * WORLDS_LEN)],
          type,
          galaxiesId,
          levelMap: LEVELMAP[type][0],
          weight,
          maxEnergy: Math.round((Math.random() * 0.4 + 0.8) * weight * 100000)
        };
      }),
      galaxiesId
    };
  }
}

/**
 * 获取一个随机的角色名字
 * 该函数通过组合姓氏和名字来生成随机角色名字，有一定概率生成双名
 * TODO: 随机生成名字需要根据性别产生名字
 * @returns {string} 随机生成的角色名字
 */
function getCharacterName() {
  let name = '';
  // 随机选择一个姓氏
  name += SURNAMES[Math.floor(Math.random() * SURNAMES_LEN)];
  // 随机选择一个名字
  name += NAMES[Math.floor(Math.random() * NAMES_LEN)];
  // 有一定概率再随机选择一个名字，生成双名
  if (Math.random() > 0.5) {
    name += NAMES[Math.floor(Math.random() * NAMES_LEN)];
  }
  return name;
}

/**
 * 获取一个随机的角色特质
 * @returns {string} 随机生成的角色特质
 */
function getCharacterTalent(length: number): CharacterTalent[] {
  let talentList: Set<CharacterTalent> = new Set();
  for (let index = 0; index < length; index++) {
    talentList.add(TALENTS[Math.floor(Math.random() * TALENTS_LEN)]);
  }
  return Array.from(talentList);
}

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
