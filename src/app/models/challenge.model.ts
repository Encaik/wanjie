import { RewardPool } from './reward.model';

export interface Challenge {
  name: string; // 秘境名称
  description: string; // 秘境描述
  level: string; // 秘境等级
  reward: RewardPool; // 秘境奖励
}
