import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';
import { startPageGuard } from './guards/start-page.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'universe', component: UniverseComponent, canActivate: [startPageGuard] }
];
