import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalRefMock } from '@utils/test';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { BattleModalComponent } from './battle-modal.component';

describe('BattleModalComponent', () => {
  let component: BattleModalComponent;
  let fixture: ComponentFixture<BattleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleModalComponent],
      providers: [{ provide: NzModalRef, useClass: NzModalRefMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(BattleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
