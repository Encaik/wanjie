import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BackpackComponent } from './backpack.component';

describe('BackpackComponent', () => {
  let component: BackpackComponent;
  let fixture: ComponentFixture<BackpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackpackComponent],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(BackpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
