import { Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [NzTypographyModule],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.less',
})
export class SiderComponent {}
