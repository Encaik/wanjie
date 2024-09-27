export interface Event {
  type: EventType;
  operate: EventOperate;
  data: any;
}

export interface EventRes<T = any> {
  status: 'success' | 'fail';
  msg: string;
  data: T;
}

export enum EventType {
  Character,
  Item,
  System
}

export type EventOperate = CharacterEventOperate | ItemEventOperate | SystemEventOperate;

export enum CharacterEventOperate {
  Cultivation,
  Upgrade
}

export enum ItemEventOperate {
  Add,
  Drop,
  Reward,
  Use
}

export enum SystemEventOperate {
  Save,
  Load,
  Delete
}
