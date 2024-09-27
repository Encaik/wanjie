import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BattleModalComponent } from '../components/battle-modal/battle-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  private modal = inject(NzModalService);

  createBattleModal() {
    return this.modal.create({
      nzTitle: '战斗',
      nzContent: BattleModalComponent,
      nzFooter: null,
      nzClosable: false,
      nzWidth: '1000px',
      nzMaskClosable: false
    });
  }
}
