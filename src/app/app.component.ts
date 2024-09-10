import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './layouts/header/header.component';
import { CharacterComponent } from './layouts/character/character.component';
import { HomeComponent } from './pages/home/home.component';
import { SiderComponent } from './layouts/sider/sider.component';
import { EnvService } from './services/env.service';
import { EnvType } from './model';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CharacterModalComponent } from './components/character-modal/character-modal.component';

const layouts = [
  HeaderComponent,
  CharacterComponent,
  HomeComponent,
  SiderComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, NzModalModule, ...layouts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  private envSrv = inject(EnvService);
  private modal = inject(NzModalService);
  title = 'wanjie';

  ngOnInit() {
    this.initCharacter().afterClose.subscribe(() => {
      this.initEnv();
    });
  }

  initCharacter(): NzModalRef<CharacterModalComponent, any> {
    return this.modal.create({
      nzContent: CharacterModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzTitle: '初始化角色',
      nzWidth: '800px',
    });
  }

  initEnv() {
    this.envSrv.setEnv({
      name: '新手世界',
      type: EnvType.Base,
      levelMap: {
        0: '新手',
        1: '初级',
        2: '中级',
        3: '高级',
        4: '专家',
        5: '王者',
        6: '宗师',
        7: '至尊',
        8: '无尽',
        9: '终极',
        10: '传说',
      },
      maxEnergy: 10000,
      weight: 1,
    });
  }
}
