import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LevelMapViewComponent } from '@components/level-map-view/level-map-view.component';
import { EventType, SystemEventOperate } from '@models';
import { TimeFormatPipe } from '@pipes/time-format.pipe';
import { EnvService, CharacterService, TimeTickService, EventService } from '@services';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzDescriptionsModule, NzGridModule, KeyValuePipe, TimeFormatPipe, NzTagModule, NzButtonModule, LevelMapViewComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public envSrv = inject(EnvService);
  private characterSrv = inject(CharacterService);
  private timeTickSrv = inject(TimeTickService);
  private event = inject(EventService);
  private notice = inject(NzNotificationService);

  get timeTick() {
    return this.timeTickSrv.getTimeTick();
  }

  get env() {
    return this.envSrv;
  }

  get currentLevel() {
    return this.characterSrv.levelInfo.level;
  }

  onSaveClick() {
    this.event
      .sendEvent({
        operate: SystemEventOperate.Save,
        type: EventType.System,
        data: null
      })
      .subscribe(res => {
        if (res.status === 'success') {
          this.notice.success('保存成功', res.msg);
        }
      });
  }

  onDeleteClick() {
    this.event
      .sendEvent({
        operate: SystemEventOperate.Delete,
        type: EventType.System,
        data: null
      })
      .subscribe(res => {
        if (res.status === 'success') {
          this.notice.success('删档成功', res.msg);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  }
}
