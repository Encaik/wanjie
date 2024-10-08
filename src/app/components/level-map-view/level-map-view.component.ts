import { KeyValuePipe } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-level-map-view',
  standalone: true,
  imports: [NzTagModule, KeyValuePipe],
  templateUrl: './level-map-view.component.html'
})
export class LevelMapViewComponent {
  @Input() levelMap: Record<number, string> = {};
  @Input() @Optional() currentLevel: number | undefined;

  sort() {
    return 0;
  }

  getHightLightLevel(level: string) {
    return Number(this.currentLevel) === Number(level) ? 'blue' : 'default';
  }
}
