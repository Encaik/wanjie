import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { Task, ItemMap, getItemLevelClass, LogLevel, LogType } from '../../../../models';
import { BackpackService } from '../../../../services/backpack.service';
import { LogService } from '../../../../services/log.service';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NzTypographyModule, NzEmptyModule, NzButtonModule],
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  private taskSrv = inject(TaskService);
  private backpackSrv = inject(BackpackService);
  private logSrv = inject(LogService);
  currentTask: Task | undefined;
  ItemMap = ItemMap;

  ngOnInit(): void {
    this.taskSrv.task$.subscribe(task => (this.currentTask = task));
  }

  onGetRewardClick() {
    if (!this.currentTask) return;
    this.backpackSrv.addRewardItems(this.currentTask.rewards);
    this.currentTask && this.taskSrv.complatedTask(this.currentTask);
  }
}
