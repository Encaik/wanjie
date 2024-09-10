import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { BaseInfo } from '../../model';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-character-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzStepsModule,
    NzButtonModule,
    NzCardModule,
    NzDescriptionsModule,
  ],
  templateUrl: './character-modal.component.html',
  styleUrl: './character-modal.component.less',
})
export class CharacterModalComponent {
  private ref = inject(NzModalRef);
  current: number = 0;
  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  characters: Pick<BaseInfo, 'name' | 'gender' | 'age'>[] = [];

  ngOnInit() {
    this.generateCharacter();
  }

  generateCharacter() {
    this.characters = Array.from({ length: 8 }, (_, i) => ({
      name: `姓名${i + 1}`,
      gender: Math.random() > 0.5 ? '男' : '女',
      age: Math.floor(Math.random() * 100),
    }));
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    this.ref.close('done');
  }
}
