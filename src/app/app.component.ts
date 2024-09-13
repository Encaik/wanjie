import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

import { InitModalComponent } from './components/init-modal/init-modal.component';
import { CharacterComponent } from './layouts/character/character.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SiderComponent } from './layouts/sider/sider.component';
import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';
import { EnvService } from './services/env.service';
import { RuntimeService } from './services/runtime.service';
import { Generate } from './utils/generate';

const layouts = [HeaderComponent, CharacterComponent, HomeComponent, SiderComponent, UniverseComponent];

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
  private envSrv = inject(EnvService);
  title = 'wanjie';
  segmentedList: string[] = ['修炼', '虚空', '副本'];
  currentSegmented = 0;

  ngOnInit() {
    this.rtSrv.load().then(data => {
      if (data) {
        this.rtSrv.init(data.characterData, data.envData);
      } else {
        this.init();
      }
    });
  }

  init() {
    this.modal
      .create({
        nzContent: InitModalComponent,
        nzFooter: null,
        nzClosable: false,
        nzMaskClosable: false,
        nzTitle: '初始化角色',
        nzWidth: '1000px'
      })
      .afterClose.subscribe(({ character, env }) => {
        this.rtSrv.init(
          {
            baseInfo: character
          },
          env
        );
        this.envSrv.addEnvGraph([env]);
        // 下面为测试逻辑
        const envs = Generate.envs(8);
        this.envSrv.addEnvGraph(envs, env.id);
        envs.forEach(item => {
          this.envSrv.addEnvGraph(Generate.envs(8), item.id);
        });
      });
  }

  onSegmentedChange(value: number) {
    this.currentSegmented = value;
  }
}
