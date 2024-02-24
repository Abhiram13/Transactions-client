import { Component } from '@angular/core';
import { InputFieldDirective } from '../../directives/input-directive/input-field.directive';

@Component({
  selector: 'api-client',
  standalone: true,
  imports: [InputFieldDirective],
  templateUrl: './api-client.component.html',
  styleUrl: './api-client.component.scss'
})
export class ApiClientComponent {

}
