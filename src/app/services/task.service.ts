import { inject, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { StatisticsEventType, Task, TASKS } from '../models';
import { StatisticsService } from './statistics.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  currentTask: Task | undefined;
  taskSub: Subject<Task> = new Subject();
  task$ = this.taskSub.asObservable();

  initTask(): void {
    this.setCurrentTask(TASKS[0]);
  }

  complatedTask(task: Task): void {
    const nextTask = TASKS[task.nextId] || undefined;
    if (!nextTask) return;
    this.setCurrentTask(nextTask);
  }

  setCurrentTask(task: Task) {
    this.currentTask = task;
    this.taskSub.next(task);
  }

  getCurrentTask(): Task | undefined {
    return this.currentTask;
  }
}
