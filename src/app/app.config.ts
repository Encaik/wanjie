import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { zh_CN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';

import { routes } from './app.routes';
import { apiInterceptor } from './interceptors/api-interceptor.interceptor';

const ZORRO_SERVICES = [NzModalService];

registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(zh_CN),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiInterceptor])),
    ...ZORRO_SERVICES
  ]
};
