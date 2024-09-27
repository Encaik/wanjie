import { TestBed } from '@angular/core/testing';
import { NzModalService } from 'ng-zorro-antd/modal';

import { BattleService } from './battle.service';

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
