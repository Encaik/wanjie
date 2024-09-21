export interface Log {
  msg: string;
  time?: number;
  type: LogType;
  level: LogLevel;
}

export enum LogType {
  System,
  Character,
  Env,
  Item
}

export enum LogLevel {
  Info,
  Warn,
  Error
}

export const LogTypeMap = {
  [LogType.System]: '系统',
  [LogType.Character]: '角色',
  [LogType.Env]: '环境',
  [LogType.Item]: '物品'
};
