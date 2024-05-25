import { Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { ConfigureComponent } from './routes/configure/configure.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "add", component: ConfigureComponent },
];
