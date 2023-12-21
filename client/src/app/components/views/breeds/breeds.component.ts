import { Component } from '@angular/core'
import { NavComponent } from '../../nav/nav.component'
import { BreedSectionComponent } from '../../breed-section/breed-section.component'
import { BreedFormComponent } from '../../breed-form/breed-form.component'
import { ContainerTitleComponent } from '../../container-title/container-title.component'
import { ErrorDisplayComponent } from '../../error-display/error-display.component'

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [NavComponent, BreedSectionComponent, BreedFormComponent, ContainerTitleComponent, ErrorDisplayComponent],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css',
})
export class BreedsComponent {
  errorMessages: string[] = []

  onErrorMessagesChange(messages: string[]): void {
    this.errorMessages = messages
  }
}
