import { Routes } from '@angular/router';
import { ChallengeComponent } from './challenge.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { QuickExploreComponent } from './pages/quick-explore/quick-explore.component';

export const routes: Routes = [
  { path: '', component: ChallengeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'quick-explore', component: QuickExploreComponent }
];
