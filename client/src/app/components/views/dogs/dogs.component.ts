import { Component } from '@angular/core'
import { DogSectionComponent } from '../../dog-section/dog-section.component'
import { NavComponent } from '../../nav/nav.component'
import { DogFormComponent } from '../../dog-form/dog-form.component'
import { ContainerTitleComponent } from '../../container-title/container-title.component'
import { ErrorDisplayComponent } from '../../error-display/error-display.component'

@Component({
  selector: 'app-dogs',
  standalone: true,
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
  imports: [DogSectionComponent, NavComponent, DogFormComponent, ContainerTitleComponent, ErrorDisplayComponent],
})
export class DogsComponent {
  errorMessages: string[] = []

  onErrorMessagesChange(messages: string[]): void {
    this.errorMessages = messages
  }
}
