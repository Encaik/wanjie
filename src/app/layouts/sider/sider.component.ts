import { Component, inject } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LogService } from '../../services/log.service';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [NzTypographyModule, NzTimelineModule],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.less',
})
export class SiderComponent {
  private logSrv = inject(LogService);

  logList: string[] = [];

  ngOnInit() {
    this.logSrv.logSubject.subscribe((msg) => {
      this.logList.push(msg);
    });
  }
}
