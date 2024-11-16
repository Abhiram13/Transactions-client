import { Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { AddConfigureComponent, EditConfigureComponent } from './routes/transactions/configure/configure.component';
import { TransactionListComponent } from './routes/transactions/list/transactions.component';
import { CategoryListComponent } from './routes/categories/list/list.component';
import { CategoryConfigureComponent, EditCategoryComponent } from './routes/categories/configure/configure.component';
import { BankListComponent } from './routes/banks/list/list.component';
import { BankAddComponent, BankEditComponent } from './routes/banks/configure/configure.component';
import { ByDateComponent } from './routes/transactions/by-date/by-date.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "transactions", children: [
        { path: "", component: TransactionListComponent },
        { path: "add", component: AddConfigureComponent },
        { path: "date/:date", component: ByDateComponent },
        { path: "edit/:id", component: EditConfigureComponent },
    ]},
    { path: "categories", children: [
        { path: "", component: CategoryListComponent },
        { path: "add", component: CategoryConfigureComponent},
        { path: "edit/:id", component: EditCategoryComponent}
    ]},
    { path: "banks", children: [
        { path: "", component: BankListComponent },
        { path: "add", component: BankAddComponent},
        { path: "edit/:id", component: BankEditComponent}
    ]},
];
