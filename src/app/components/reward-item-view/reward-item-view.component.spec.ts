import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemViewComponent } from './reward-item-view.component';

describe('RewardItemViewComponent', () => {
  let component: RewardItemViewComponent;
  let fixture: ComponentFixture<RewardItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardItemViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RewardItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
