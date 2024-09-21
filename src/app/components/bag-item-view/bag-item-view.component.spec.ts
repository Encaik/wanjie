import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagItemViewComponent } from './bag-item-view.component';

describe('ItemViewComponent', () => {
  let component: BagItemViewComponent;
  let fixture: ComponentFixture<BagItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagItemViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BagItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
