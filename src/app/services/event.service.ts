import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Event, EventType } from '../models/event.model';
import { CharacterService } from './character.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event: Subject<Event> = new Subject();
  event$ = this.event.asObservable();

  private taskSrv = inject(TaskService);
  private characterSrv = inject(CharacterService);

  sendEvent(event: Event): Promise<any> {
    this.event.next(event);
    this.taskSrv.update(event);
    return new Promise(resolve => {
      switch (event.type) {
        case EventType.Character:
          resolve(this.characterSrv.eventDetail(event));
          break;
        default:
          resolve(undefined);
          break;
      }
    });
  }
}
