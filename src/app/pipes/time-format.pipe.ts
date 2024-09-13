import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  tenDaysMap: Record<number, string> = {
    0: '上旬',
    1: '中旬',
    2: '下旬'
  };

  transform(value: number): string {
    let timeTick = value;
    const tenDays = value % 3;
    timeTick = Math.floor(timeTick / 3);
    const month = `${(timeTick % 12) + 1}`.padStart(2, '0');
    timeTick = Math.floor(timeTick / 12);
    const year = `${timeTick % 100}`.padStart(4, '0');
    timeTick = Math.floor(timeTick / 10000);
    const era = (timeTick % 10000) + 1;
    return `第${era}纪元-${year}年-${month}月-${this.tenDaysMap[tenDays]}`;
  }
}
