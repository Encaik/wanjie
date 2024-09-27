import { Component, inject } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { StatisticsService } from '../../storages/statistics.service';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NzTypographyModule, NzDescriptionsModule],
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent {
  public statisticsSrv = inject(StatisticsService);
}
