import { v4 as uuidv4 } from 'uuid';

import LEVELMAP from '../assets/data/level-map.json';
import NAMES from '../assets/data/names.json';
import SURNAMES from '../assets/data/surnames.json';
import TALENTS from '../assets/data/talents.json';
import WORLDS from '../assets/data/worlds.json';
import { BattleCharacter, CharacterTalent, Env, EnvType, InitCharacter } from '../models';

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
   *
   * @todo 完善天赋体系及角色升级逻辑
   * @body 丰富角色属性和计算逻辑，封装一个用于计算属性的工具类
   */
  static characters(length: number): InitCharacter[] {
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

  static enemys(length: number): BattleCharacter[] {
    return Array.from({ length }, (_, i) => {
      const attrInfo = {
        hp: Math.round(Math.random() * 40) + 100,
        mp: Math.round(Math.random() * 40) + 100,
        attack: Math.round(Math.random() * 40) + 20,
        defence: Math.round(Math.random() * 40) + 20,
        speed: Math.round(Math.random() * 40),
        critRate: Math.round(Math.random() * 5) + 2,
        critDamage: Math.round(Math.random() * 20) + 10
      };
      return {
        id: `enemy-${uuidv4()}`,
        isEnemy: true,
        baseInfo: {
          name: getCharacterName(),
          gender: Math.random() > 0.5 ? '男' : '女',
          age: Math.floor(Math.random() * 10) * 2 + 12,
          talent: getCharacterTalent(1)
        },
        statusInfo: {
          hp: attrInfo.hp,
          mp: attrInfo.mp,
          buffs: []
        },
        levelInfo: {
          energy: Math.round(Math.random() * 1000),
          level: 0
        },
        attrInfo
      };
    });
  }

  /**
   * 生成指定数量的环境对象，并分配到一个星系ID下
   *
   * 此方法用于创建一个包含多个环境对象的数组，这些环境对象共享同一个星系ID
   * 它首先生成一个唯一的星系ID，然后根据指定的长度生成相应数量的环境对象
   * 每个环境对象都具有随机生成的属性，如类型、等级映射、权重和最大能量等
   *
   * @param length 环境对象数组的长度，即要生成的环境对象数量
   * @returns 返回一个包含两个属性的对象：
   *          - envs: 一个环境对象数组
   *          - galaxiesId: 所有环境对象所属的星系ID
   *
   * @todo 完善世界等级体系
   * @body 等级体系随机选中一套预设，并完善预设等级数量不同时的其他参数
   */
  static envs(length: number): { envs: Env[]; galaxiesId: string } {
    const galaxiesId = `galaxie-${uuidv4()}`;
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
 * @returns {string} 随机生成的角色名字
 *
 * @todo 随机生成名字需要根据性别产生名字
 * @body 将名从原有的数组分为男名数组和女名数组
 */
export function getCharacterName() {
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
 * 获取一个随机的角色天赋
 * @returns {string} 随机生成的角色天赋
 *
 * @todo 完善天赋生成逻辑
 * @body 设计天赋生成、使用及计算等功能，并完成开发
 */
export function getCharacterTalent(length: number): CharacterTalent[] {
  let talentList: Set<CharacterTalent> = new Set();
  for (let index = 0; index < length; index++) {
    talentList.add(TALENTS[Math.floor(Math.random() * TALENTS_LEN)]);
  }
  return Array.from(talentList);
}
