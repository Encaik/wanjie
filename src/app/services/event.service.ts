import { inject, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Event, EventType } from '../models/event.model';
import { CharacterService } from './character.service';
import { TaskService } from './task.service';
import { BackpackService } from './backpack.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event: Subject<Event> = new Subject();
  event$ = this.event.asObservable();

  private taskSrv = inject(TaskService);
  private characterSrv = inject(CharacterService);
  private backpackService = inject(BackpackService);

  sendEvent(event: Event): Observable<any> | void {
    this.event.next(event);
    this.taskSrv.update(event);
    switch (event.type) {
      case EventType.Character:
        return this.characterSrv.eventDetail(event);
      case EventType.Item:
        return this.backpackService.eventDetail(event);
      default:
        return;
    }
  }
}
