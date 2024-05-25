import { Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { ConfigureComponent } from './routes/transactions/configure/configure.component';
import { TransactionListComponent } from './routes/transactions/list/transactions.component';
import { CategoryListComponent } from './routes/categories/list/list.component';
import { CategoryConfigureComponent } from './routes/categories/configure/configure.component';
import { BankListComponent } from './routes/banks/list/list.component';
import { BankConfigureComponent } from './routes/banks/configure/configure.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "transactions", children: [
        { path: "", component: TransactionListComponent },
        { path: "add", component: ConfigureComponent}
    ]},
    { path: "categories", children: [
        { path: "", component: CategoryListComponent },
        { path: "add", component: CategoryConfigureComponent}
    ]},
    { path: "banks", children: [
        { path: "", component: BankListComponent },
        { path: "add", component: BankConfigureComponent}
    ]},
];
