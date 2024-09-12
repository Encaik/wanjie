import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelMapViewComponent } from './level-map-view.component';

describe('LevelMapViewComponent', () => {
  let component: LevelMapViewComponent;
  let fixture: ComponentFixture<LevelMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelMapViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LevelMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
