import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface OrganisationTable {
   name: string;
   manager: string;
   employee_count: number;   
}

const ELEMENT_DATA: OrganisationTable[] = [
   { name: 'Hydrogen', manager: "Me", employee_count: 3 },
];

@Component({
   selector: 'dashboard',
   standalone: true,
   imports: [MatTableModule, MatCheckboxModule],
   templateUrl: './dashboard.component.html',
   styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
   displayedColumns: string[] = ['select', 'name', 'weight', 'symbol'];
   dataSource = new MatTableDataSource<OrganisationTable>(ELEMENT_DATA);
   selection = new SelectionModel<OrganisationTable>(true, []);

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
   }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   toggleAllRows() {
      if (this.isAllSelected()) {
         this.selection.clear();
         return;
      }

      this.selection.select(...this.dataSource.data);
   }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: OrganisationTable): string {
      if (!row) {
         return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
   }
}
