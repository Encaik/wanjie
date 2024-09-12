import NAMES from '../assets/data/names.json';
import SURNAMES from '../assets/data/surnames.json';
import WORLDS from '../assets/data/worlds.json';
import TRAITS from '../assets/data/traits.json';

const SURNAMES_LEN = SURNAMES.length;
const NAMES_LEN = NAMES.length;
const WORLDS_LEN = WORLDS.length;
const TRAITS_LEN = TRAITS.length;

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
  static characters(length: number) {
    // TODO: 完善特质体系及相关逻辑
    return Array.from({ length }, (_, i) => ({
      name: getCharacterName(),
      gender: Math.random() > 0.5 ? '男' : '女',
      age: Math.floor(Math.random() * 20) * 2,
      ability: getCharacterTrait()
    }));
  }

  /**
   * 生成指定数量的环境设定
   *
   * @param length 环境数量
   * @returns 环境数组，包含每个环境的世界名、等级映射、权重和最大能量值
   */
  static envs(length: number) {
    // TODO: 等级体系随机选中一套预设，并完善预设等级数量不同时的其他参数
    return Array.from({ length }, (_, i) => {
      const weight: number = Number((Math.random() * 0.5 + 0.75).toFixed(2));
      return {
        name: WORLDS[Math.floor(Math.random() * WORLDS_LEN)],
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
          10: '传说'
        },
        weight,
        maxEnergy: Math.floor(9000 + 1000 * Math.random() * weight)
      };
    });
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
function getCharacterTrait() {
  let trait = '';
  // 随机选择一个特质
  trait = TRAITS[Math.floor(Math.random() * TRAITS_LEN)].trait;
  return trait;
}