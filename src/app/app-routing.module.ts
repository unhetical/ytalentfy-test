import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionsListComponent } from './pages/positions-list/positions-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/positions-list',
    pathMatch: 'full',
  },
  {
    path: 'positions-list',
    component: PositionsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
