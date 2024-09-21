import { Routes } from '@angular/router';

import { startPageGuard } from './guards/start-page.guard';
import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';
import { MethodComponent } from './pages/method/method.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    canActivate: [startPageGuard],
    children: [
      { path: 'method', component: MethodComponent },
      { path: 'universe', component: UniverseComponent },
      { path: 'challenge', component: ChallengeComponent }
    ]
  }
];
