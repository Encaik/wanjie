import { Component, inject, OnInit } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { ItemMap, Task } from '../../../../models';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NzTypographyModule, NzEmptyModule],
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  private taskSrv = inject(TaskService);
  currentTask: Task | undefined;

  ItemMap = ItemMap;

  ngOnInit(): void {
    this.taskSrv.task$.subscribe(task => (this.currentTask = task));
  }
}
