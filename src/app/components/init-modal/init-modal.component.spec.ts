import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { NzModalRefMock } from '../../utils/test';
import { InitModalComponent } from './init-modal.component';

describe('InitModalComponent', () => {
  let component: InitModalComponent;
  let fixture: ComponentFixture<InitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitModalComponent],
      providers: [{ provide: NzModalRef, useClass: NzModalRefMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(InitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
