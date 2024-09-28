import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { environment } from 'environments/environment';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

injectSpeedInsights();
inject();

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
