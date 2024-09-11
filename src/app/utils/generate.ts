export class Generate {
  static characters(length: number) {
    return Array.from({ length }, (_, i) => ({
      name: `姓名${i + 1}`,
      gender: Math.random() > 0.5 ? '男' : '女',
      age: Math.floor(Math.random() * 100),
      ability: '特质' + Math.floor(Math.random() * 100),
    }));
  }

  static envs(length: number) {
    return Array.from({ length }, (_, i) => ({
      name: `世界${i + 1}`,
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
      weight: 1,
      maxEnergy: 10000,
    }));
  }
}
