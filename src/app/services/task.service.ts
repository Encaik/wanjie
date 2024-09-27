import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task, TASKS } from '../models';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  currentTask: Task | undefined;
  taskSub: Subject<Task | undefined> = new Subject();
  task$ = this.taskSub.asObservable();

  update(event: Event) {
    let isCompleted = true;
    this.currentTask?.conditions?.forEach(condition => {
      if (this.isEqual(condition.event, event)) {
        condition.current++;
      }
      if (condition.current < condition.goal) {
        isCompleted = false;
      }
    });
    if (this.currentTask) {
      this.currentTask.isCompleted = isCompleted;
    }
  }

  isEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  complatedTask(task: Task): void {
    const nextTask = task.nextId ? TASKS[task.nextId] : undefined;
    this.setCurrentTask(nextTask);
  }

  setCurrentTask(task: Task | undefined) {
    this.currentTask = task;
    this.taskSub.next(task);
  }

  getCurrentTask(): Task | undefined {
    return this.currentTask;
  }
}
