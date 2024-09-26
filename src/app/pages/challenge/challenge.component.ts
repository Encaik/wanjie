import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { RewardItemViewComponent } from '../../components/reward-item-view/reward-item-view.component';
import { Challenge, RewardPoolMap } from '../../models';
import { EnvService } from '../../services/env.service';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [NzCardModule, RewardItemViewComponent, NzTagModule, NzButtonModule],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.less'
})
export class ChallengeComponent {
  private envSrv = inject(EnvService);
  private router = inject(Router);

  challengeList: Challenge[] = [
    {
      name: '一阶秘境',
      description: '这里是一阶应该进入的秘境，你可以通过这个秘境获得一些奖励',
      level: this.envSrv.levelMap[0],
      reward: RewardPoolMap.Challenge1
    }
  ];

  onExploreClick(challenge: Challenge, isQuickExplore = false) {
    this.router.navigate([`/challenge/${isQuickExplore ? 'quick-explore' : 'explore'}`], {
      queryParams: { name: challenge.name }
    });
  }
}
