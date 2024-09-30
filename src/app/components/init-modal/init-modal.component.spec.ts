import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalRefMock } from '@utils/test';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { InitModalComponent } from './init-modal.component';
import { provideHttpClient } from '@angular/common/http';

describe('InitModalComponent', () => {
  let component: InitModalComponent;
  let fixture: ComponentFixture<InitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitModalComponent],
      providers: [{ provide: NzModalRef, useClass: NzModalRefMock }, provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
