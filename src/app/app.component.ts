import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './layouts/header/header.component';
import { CharacterComponent } from './layouts/character/character.component';
import { HomeComponent } from './pages/home/home.component';
import { SiderComponent } from './layouts/sider/sider.component';

const layouts = [
  HeaderComponent,
  CharacterComponent,
  HomeComponent,
  SiderComponent,
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, ...layouts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'wanjie';
}
