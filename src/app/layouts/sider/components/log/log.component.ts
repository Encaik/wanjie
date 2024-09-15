import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { LogTypeMap } from '../../../../models';
import { LogService } from '../../../../services/log.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [NzTimelineModule, NzTypographyModule],
  templateUrl: './log.component.html'
})
export class LogComponent implements OnInit {
  private logSrv = inject(LogService);
  public LogTypeMap = LogTypeMap;

  isScroll: boolean = false;

  @ViewChild('log') log!: ElementRef;

  get logList() {
    return this.logSrv.logList;
  }

  ngOnInit() {
    this.logSrv.logSubject.subscribe(log => {
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
