import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-container-title',
  standalone: true,
  imports: [],
  templateUrl: './container-title.component.html',
  styleUrl: './container-title.component.css',
})
export class ContainerTitleComponent {
  @Input() text!: string
}
