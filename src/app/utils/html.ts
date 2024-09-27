import { getItemLevelClass } from '@models';

export function getItemSpan(level: number, name: string) {
  return `<span class="${getItemLevelClass(level)}">${name}</span>`;
}
