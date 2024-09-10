import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  isScroll: boolean = false;

  @ViewChild('log') log!: ElementRef;

  ngOnInit() {
    this.logSrv.logSubject.subscribe((msg) => {
      this.logList.push(msg);
      if (this.isScroll) {
      } else {
        setTimeout(() => {
          this.log.nativeElement.scrollTo({
            top: this.log.nativeElement.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    });
  }
}
