import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodComponent } from './method.component';

describe('MethodComponent', () => {
  let component: MethodComponent;
  let fixture: ComponentFixture<MethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
