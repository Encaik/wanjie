import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
