import { CharacterEventOperate, EventType, Event } from './event.model';

export interface Task {
  id: number;
  nextId: number;
  title: string;
  description: string;
  rewards: TaskReward[];
  isCompleted: boolean;
  conditions: TaskCondition[];
}

export interface TaskCondition {
  title: string;
  event: Event;
  current: number;
  goal: number;
}

export interface TaskReward {
  id: string;
  count: number;
}

export const TASKS: Record<string, Task> = {
  1: {
    id: 1,
    nextId: 2,
    title: '开始修炼',
    description: '点击开始修炼按钮，完成第一次修炼',
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
    nextId: 3,
    title: 'Task 2',
    description: 'This is the second task',
    rewards: [],
    isCompleted: false,
    conditions: []
  }
};
