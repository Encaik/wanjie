import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CharacterStatistics } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  public characterStatistics: CharacterStatistics = {
    cultivationCount: 0
  };
}
