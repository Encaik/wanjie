import SURNAMES from '../assets/data/surnames.json';
import NAMES from '../assets/data/names.json';
import WORLDS from '../assets/data/worlds.json';

const SURNAMES_LEN = SURNAMES.length;
const NAMES_LEN = NAMES.length;
const WORLDS_LEN = WORLDS.length;

export class Generate {
  static characters(length: number) {
    return Array.from({ length }, (_, i) => ({
      name: getCharacterName(),
      gender: Math.random() > 0.5 ? '男' : '女',
      age: Math.floor(Math.random() * 20) * 2,
      ability: '特质' + Math.floor(Math.random() * 100),
    }));
  }

  static envs(length: number) {
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
          10: '传说',
        },
        weight,
        maxEnergy: Math.floor(9000 + 1000 * Math.random() * weight),
      };
    });
  }
}

function getCharacterName() {
  let name = '';
  name += SURNAMES[Math.floor(Math.random() * SURNAMES_LEN)];
  name += NAMES[Math.floor(Math.random() * NAMES_LEN)];
  if (Math.random() > 0.5) {
    name += NAMES[Math.floor(Math.random() * NAMES_LEN)];
  }
  return name;
}
