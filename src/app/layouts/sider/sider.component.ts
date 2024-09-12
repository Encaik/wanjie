import { Component } from '@angular/core';
import { LogComponent } from './components/log/log.component';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [LogComponent, TaskComponent],
  templateUrl: './sider.component.html'
})
export class SiderComponent {}
