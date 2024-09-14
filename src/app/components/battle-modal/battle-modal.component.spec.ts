import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleModalComponent } from './battle-modal.component';

describe('BattleModalComponent', () => {
  let component: BattleModalComponent;
  let fixture: ComponentFixture<BattleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BattleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
