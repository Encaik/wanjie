import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './layouts/header/header.component';
import { CharacterComponent } from './layouts/character/character.component';
import { HomeComponent } from './pages/home/home.component';
import { SiderComponent } from './layouts/sider/sider.component';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { InitModalComponent } from './components/init-modal/init-modal.component';

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
  private modal = inject(NzModalService);
  title = 'wanjie';

  ngOnInit() {
    setTimeout(() => {
      this.init();
    });
  }

  init() {
    this.modal.create({
      nzContent: InitModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzTitle: '初始化角色',
      nzWidth: '800px',
    });
  }
}
