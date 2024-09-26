export interface Event {
  type: EventType;
  operate: EventOperate;
  data: any;
}

export enum EventType {
  Character
}

export type EventOperate = CharacterEventOperate;

export enum CharacterEventOperate {
  Cultivation,
  Upgrade
}
