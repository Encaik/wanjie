import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import { NzModalService } from 'ng-zorro-antd/modal';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzModalService]
    });
    service = TestBed.inject(BattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
