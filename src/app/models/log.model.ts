export interface Log {
  msg: string;
  time?: number;
  type: LogType;
  level: LogLevel;
}

export enum LogType {
  System,
  Character,
  Env
}

export enum LogLevel {
  Info,
  Warn,
  Error
}

export const LogTypeMap = {
  [LogType.System]: '系统',
  [LogType.Character]: '人物',
  [LogType.Env]: '环境'
};
