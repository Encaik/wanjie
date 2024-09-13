import { bootstrapApplication } from '@angular/platform-browser';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

injectSpeedInsights();
inject();
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
