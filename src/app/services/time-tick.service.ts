import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeTickService {
  timeTick: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  timeTick$ = this.timeTick.asObservable();

  nextTimeTick() {
    this.timeTick.next(this.timeTick.value + 1);
  }

  getTimeTick() {
    return this.timeTick.value;
  }

  setTimeTick(timeTick: number) {
    this.timeTick.next(timeTick);
  }
}
