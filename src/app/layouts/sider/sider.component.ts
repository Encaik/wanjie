import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { LogService } from '../../services/log.service';
import { getTypeDesc } from '../../models';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [NzTypographyModule, NzTimelineModule],
  templateUrl: './sider.component.html'
})
export class SiderComponent implements OnInit {
  private logSrv = inject(LogService);
  public getTypeDesc = getTypeDesc;

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
