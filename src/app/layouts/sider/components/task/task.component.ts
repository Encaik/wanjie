import { Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NzTypographyModule],
  templateUrl: './task.component.html'
})
export class TaskComponent {}
