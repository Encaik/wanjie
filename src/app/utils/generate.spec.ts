import { BattleCharacter, Env, EnvType, InitCharacter } from '../models';
import { Generate, getCharacterName, getCharacterTalent } from './generate';

describe('Util Generate', () => {
  beforeEach(async () => {
    // 在每个测试之前重置随机数种子，以便每次测试结果一致
    jasmine.clock().install();
    jasmine.clock().mockDate();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('#characters()', () => {
    it('should generate correct number of characters', () => {
      const length = 5;
      const characters = Generate.characters(length);
      expect(characters.length).toBe(length);
      characters.forEach((character: InitCharacter) => {
        expect(character.id.startsWith('character-')).toBe(true);
        expect(character.baseInfo.name).toBeTruthy();
        expect(character.baseInfo.gender).toMatch(/^(男|女)$/);
        expect(character.baseInfo.age).toBeGreaterThanOrEqual(12);
        expect(character.baseInfo.talent).toEqual(jasmine.any(Array));
        expect(character.skillInfo.hp).toBeGreaterThanOrEqual(100);
        expect(character.skillInfo.mp).toBeGreaterThanOrEqual(100);
        expect(character.skillInfo.attack).toBeGreaterThanOrEqual(20);
        expect(character.skillInfo.defence).toBeGreaterThanOrEqual(20);
        expect(character.skillInfo.speed).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('#enemys()', () => {
    it('should generate correct number of enemies', () => {
      const length = 5;
      const enemies = Generate.enemys(length);
      expect(enemies.length).toBe(length);
      enemies.forEach((enemy: BattleCharacter) => {
        expect(enemy.id.startsWith('enemy-')).toBe(true);
        expect(enemy.isEnemy).toBe(true);
        expect(enemy.baseInfo.name).toBeTruthy();
        expect(enemy.baseInfo.gender).toMatch(/^(男|女)$/);
        expect(enemy.baseInfo.age).toBeGreaterThanOrEqual(12);
        expect(enemy.baseInfo.talent).toEqual(jasmine.any(Array));
        expect(enemy.statusInfo.hp).toBeGreaterThanOrEqual(100);
        expect(enemy.statusInfo.mp).toBeGreaterThanOrEqual(100);
        expect(enemy.statusInfo.buffs).toEqual(jasmine.any(Array));
        expect(enemy.levelInfo.energy).toBeGreaterThanOrEqual(0);
        expect(enemy.levelInfo.level).toBe(0);
        expect(enemy.attrInfo.hp).toBeGreaterThanOrEqual(100);
        expect(enemy.attrInfo.mp).toBeGreaterThanOrEqual(100);
        expect(enemy.attrInfo.attack).toBeGreaterThanOrEqual(20);
        expect(enemy.attrInfo.defence).toBeGreaterThanOrEqual(20);
        expect(enemy.attrInfo.speed).toBeGreaterThanOrEqual(0);
        expect(enemy.attrInfo.critRate).toBeGreaterThanOrEqual(2);
        expect(enemy.attrInfo.critDamage).toBeGreaterThanOrEqual(10);
      });
    });
  });

  describe('#envs()', () => {
    it('should generate correct number of environments', () => {
      const length = 5;
      const { envs, galaxiesId } = Generate.envs(length);
      expect(envs.length).toBe(length);
      envs.forEach((env: Env) => {
        expect(env.id.startsWith('env-')).toBe(true);
        expect(env.name).toEqual(jasmine.any(String));
        expect(Object.values(EnvType)).toContain(env.type);
        expect(env.galaxiesId).toEqual(galaxiesId);
        expect(env.levelMap).toEqual(jasmine.any(Object));
        expect(env.weight).toBeGreaterThanOrEqual(0.75);
        expect(env.maxEnergy).toEqual(jasmine.any(Number));
      });
    });
  });

  describe('#getCharacterName()', () => {
    it('should return a valid character name', () => {
      const name = getCharacterName();
      expect(name).toBeTruthy();
      const parts = name.split('');
      expect(parts[0]).toEqual(jasmine.any(String)); // Assuming the first part is the surname
      expect(parts[1]).toEqual(jasmine.any(String)); // Assuming the second part is the name
      if (parts.length === 3) {
        expect(parts[2]).toEqual(jasmine.any(String)); // Assuming the third part is another name
      }
    });
  });

  describe('#getCharacterTalent()', () => {
    it('should return a valid array of talents', () => {
      const talents = getCharacterTalent(1);
      expect(talents).toEqual(jasmine.any(Array));
      expect(talents.length).toBe(1);
      expect(talents[0]).toEqual(jasmine.any(Object));
    });
  });
});
