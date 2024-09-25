import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NzTypographyModule, NzButtonModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.less'
})
export class ExploreComponent {
  private router = inject(Router);

  mapList = Array.from({ length: 100 }, (_, i) => Array.from({ length: 100 }, (_, j) => `${i}-${j}`));

  onBackClick() {
    this.router.navigate(['/challenge']);
  }
}
