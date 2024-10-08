import { Component, inject, OnInit } from '@angular/core';
import { Task, ItemMap } from '@models';
import { BackpackService, TaskService } from '@services';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NzTypographyModule, NzEmptyModule, NzButtonModule],
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  private taskSrv = inject(TaskService);
  private backpackSrv = inject(BackpackService);
  currentTask: Task | undefined;
  ItemMap = ItemMap;

  ngOnInit(): void {
    this.currentTask = this.taskSrv.currentTask;
    this.taskSrv.task$.subscribe(task => (this.currentTask = task));
  }

  onGetRewardClick() {
    if (!this.currentTask) return;
    this.backpackSrv.addRewardItems(this.currentTask.rewards);
    this.currentTask && this.taskSrv.complatedTask(this.currentTask);
  }
}
