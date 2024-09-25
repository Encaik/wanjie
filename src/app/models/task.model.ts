export interface Task {
  id: number;
  nextId: number;
  title: string;
  description: string;
  rewards: TaskReward[];
  isCompleted: boolean;
  watcher: Function;
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
    watcher: () => {}
  },
  2: {
    id: 2,
    nextId: 3,
    title: 'Task 2',
    description: 'This is the second task',
    rewards: [],
    isCompleted: false,
    watcher: () => {}
  }
};
