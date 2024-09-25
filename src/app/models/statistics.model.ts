export interface CharacterStatistics {
  cultivationCount: number;
}

export interface StatisticsEvent {
  type: StatisticsEventType;
  field: string;
  count: number;
}

export enum StatisticsEventType {
  Character
}
