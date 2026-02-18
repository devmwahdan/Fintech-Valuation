
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SetupComponent } from './components/setup/setup.component';
import { ActualsComponent } from './components/actuals/actuals.component';
import { LoansComponent } from './components/loans/loans.component';
import { AssumptionsComponent } from './components/assumptions/assumptions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'actuals', component: ActualsComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'assumptions', component: AssumptionsComponent },
];
