import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [NzTypographyModule, NzTimelineModule],
  templateUrl: './sider.component.html'
})
export class SiderComponent implements OnInit {
  private logSrv = inject(LogService);

  logList: string[] = [];
  isScroll: boolean = false;

  @ViewChild('log') log!: ElementRef;

  ngOnInit() {
    this.logSrv.logSubject.subscribe(msg => {
      this.logList.push(msg);
      if (this.isScroll) {
      } else {
        setTimeout(() => {
          this.log.nativeElement.scrollTo({
            top: this.log.nativeElement.scrollHeight,
            behavior: 'smooth'
          });
        });
      }
    });
  }
}
