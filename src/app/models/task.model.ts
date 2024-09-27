import { CharacterEventOperate, EventType, Event } from './event.model';
import { RewardItem } from './reward.model';

export interface Task {
  id: number;
  nextId: number | null;
  title: string;
  description: string;
  rewards: RewardItem[];
  isCompleted: boolean;
  conditions: TaskCondition[];
}

export interface TaskCondition {
  title: string;
  event: Event;
  current: number;
  goal: number;
}

export const TASKS: Record<string, Task> = {
  1: {
    id: 1,
    nextId: 2,
    title: '开始修炼',
    description: '点击开始修炼按钮,完成第一次修炼',
    rewards: [
      {
        id: '1',
        count: 100
      }
    ],
    isCompleted: false,
    conditions: [
      {
        title: '完成修炼',
        event: {
          type: EventType.Character,
          operate: CharacterEventOperate.Cultivation,
          data: null
        },
        current: 0,
        goal: 1
      }
    ]
  },
  2: {
    id: 2,
    nextId: null,
    title: '变得更强',
    description: '修炼到了瓶颈,需要升级才能继续修炼,点击升级按钮,完成第一次升级',
    rewards: [
      {
        id: '1',
        count: 100
      }
    ],
    isCompleted: false,
    conditions: [
      {
        title: '完成升级',
        event: {
          type: EventType.Character,
          operate: CharacterEventOperate.Upgrade,
          data: null
        },
        current: 0,
        goal: 1
      }
    ]
  }
};
