import { Component, ViewChild } from '@angular/core';
import { InputFieldDirective } from '../../directives/input-directive/input-field.directive';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'api-client',
  standalone: true,
  imports: [InputFieldDirective, MatSelectModule],
  templateUrl: './api-client.component.html',
  styleUrl: './api-client.component.scss'
})
export class ApiClientComponent {
  @ViewChild(InputFieldDirective) input!: InputFieldDirective;
}
