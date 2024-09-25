import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-quick-explore',
  standalone: true,
  imports: [NzTypographyModule, NzButtonModule],
  templateUrl: './quick-explore.component.html',
  styleUrl: './quick-explore.component.less'
})
export class QuickExploreComponent {
  private router = inject(Router);

  onBackClick() {
    this.router.navigate(['/challenge']);
  }
}
