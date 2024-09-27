import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

import { InitModalComponent } from './components/init-modal/init-modal.component';
import { CharacterComponent } from './layouts/character/character.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SiderComponent } from './layouts/sider/sider.component';
import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';
import { RuntimeService } from './services/runtime.service';

const layouts = [HeaderComponent, CharacterComponent, HomeComponent, SiderComponent, UniverseComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, NzLayoutModule, NzModalModule, NzSegmentedModule, ...layouts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  private modal = inject(NzModalService);
  private rtSrv = inject(RuntimeService);
  private router = inject(Router);
  title = 'wanjie';
  segmentedList: string[] = ['修炼', '功法', '虚空', '副本', '行商', '统计'];
  segmentedRoutes: string[] = ['/home', '/method', '/universe', '/challenge', '/shop', '/statistics'];
  currentSegmented: number = 0;

  ngOnInit() {
    this.rtSrv.load().then(data => {
      if (data) {
        this.rtSrv.init(data);
      } else {
        this.init();
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentSegmented =
          this.segmentedRoutes.findIndex(route => {
            return event.url.includes(route);
          }) || 0;
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
        nzTitle: '初始化游戏',
        nzWidth: '1000px'
      })
      .afterClose.subscribe(({ character, env }) => {
        this.rtSrv.init({
          timeTickData: 0, //Math.round(Math.random() * 100),
          characterData: character,
          envData: env,
          backpackData: [],
          taskData: '1'
        });
      });
  }

  onSegmentedChange(value: number) {
    this.currentSegmented = value;
    this.router.navigate([this.segmentedRoutes[value]]);
  }
}
