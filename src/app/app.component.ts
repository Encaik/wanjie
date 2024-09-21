import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  segmentedList: string[] = ['修炼', '功法', '虚空', '副本'];
  segmentedRoutes: string[] = ['/home', '/method', '/universe', '/challenge'];
  currentSegmented: number = 0;

  ngOnInit() {
    this.rtSrv.load().then(data => {
      if (data) {
        this.rtSrv.init(data.characterData, data.envData, data.backpackData);
      } else {
        this.init();
      }
    });
    setTimeout(() => {
      this.currentSegmented = this.segmentedRoutes.indexOf(this.router.url);
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
        this.rtSrv.init(character, env);
      });
  }

  onSegmentedChange(value: number) {
    this.currentSegmented = value;
    this.router.navigate([this.segmentedRoutes[value]]);
  }
}
