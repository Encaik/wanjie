import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { InitModalComponent } from './components/init-modal/init-modal.component';
import { CharacterComponent } from './layouts/character/character.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SiderComponent } from './layouts/sider/sider.component';
import { HomeComponent } from './pages/home/home.component';
import { RuntimeService } from './services/runtime.service';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

const layouts = [HeaderComponent, CharacterComponent, HomeComponent, SiderComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, NzModalModule, NzSegmentedModule, ...layouts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  private modal = inject(NzModalService);
  private rtSrv = inject(RuntimeService);
  title = 'wanjie';
  segmentedList: string[] = ['修炼', '虚空', '副本'];

  ngOnInit() {
    this.init();
  }

  init() {
    this.modal
      .create({
        nzContent: InitModalComponent,
        nzFooter: null,
        nzClosable: false,
        nzMaskClosable: false,
        nzTitle: '初始化角色',
        nzWidth: '800px'
      })
      .afterClose.subscribe(({ character, env }) => {
        this.rtSrv.init(character, env);
      });
  }
}
