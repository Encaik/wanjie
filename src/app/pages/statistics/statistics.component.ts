import { Component, inject } from '@angular/core';
import { StatisticsService } from '@storages/statistics.service';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NzTypographyModule, NzDescriptionsModule],
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent {
  public statisticsSrv = inject(StatisticsService);
}
