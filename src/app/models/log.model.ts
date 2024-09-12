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

export const getTypeDesc = (type: LogType): string => {
  switch (type) {
    case LogType.System:
      return '系统';
    case LogType.Character:
      return '人物';
    case LogType.Env:
      return '环境';
  }
};
