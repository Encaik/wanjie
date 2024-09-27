import { CommonModule } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';
import { getPercent } from '@utils/common';

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

  getPercent = getPercent;
}
