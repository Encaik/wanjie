import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CharacterStatistics } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  static characterStatistics: CharacterStatistics = {
    cultivationCount: 0
  };
}
