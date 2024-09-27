export interface Event {
  type: EventType;
  operate: EventOperate;
  data: any;
}

export enum EventType {
  Character,
  Env,
  Task,
  Battle,
  Buff,
  Item
}

export type EventOperate = CharacterEventOperate | ItemEventOperate;

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
