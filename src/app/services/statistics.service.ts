import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { CharacterStatistics, StatisticsEvent, StatisticsEventType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  characterStatistics: CharacterStatistics = {
    cultivationCount: 0
  };
  statistics: Subject<StatisticsEvent> = new Subject();
  statistics$ = this.statistics.asObservable();

  update(event: StatisticsEvent) {
    switch (event.type) {
      case StatisticsEventType.Character:
        (this.characterStatistics as any)[event.field] += event.count;
        break;
    }
    this.statistics.next(event);
  }

  getValue(type: StatisticsEventType, field: string) {
    switch (type) {
      case StatisticsEventType.Character:
        return (this.characterStatistics as any)[field];
    }
  }
}
