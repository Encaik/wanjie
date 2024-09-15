import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';

@Component({
  selector: 'app-progress-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-view.component.html',
  host: {
    style: `
      width: 100%;
    `
  }
})
export class ProgressViewComponent {
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Input() @Optional() direction: 'left' | 'right' = 'left';
  @Input() @Optional() color: string = 'bg-green-500';

  getPercent(current: number, total: number) {
    if (total === 0) {
      return current >= 0 ? 100 : 0;
    }
    const percent = Math.round((current / total) * 100);
    return Math.min(100, Math.max(0, percent));
  }
}
