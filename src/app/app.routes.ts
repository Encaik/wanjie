import { Routes } from '@angular/router';

import { startPageGuard } from './guards/start-page.guard';
import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'universe', component: UniverseComponent, canActivate: [startPageGuard] }
];
