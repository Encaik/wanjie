import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickExploreComponent } from './quick-explore.component';

describe('QuickExploreComponent', () => {
  let component: QuickExploreComponent;
  let fixture: ComponentFixture<QuickExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickExploreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
