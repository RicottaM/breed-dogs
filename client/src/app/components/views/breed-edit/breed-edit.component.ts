import { Component, inject } from '@angular/core'
import { NavComponent } from '../../nav/nav.component'
import { ActivatedRoute } from '@angular/router'
import { Breed } from '../../../models/breed.model'
import { BreedService } from '../../../services/breeds/breed.service'
import { BreedEditFormComponent } from '../../breed-edit-form/breed-edit-form.component'
import { ErrorDisplayComponent } from '../../error-display/error-display.component'

@Component({
  selector: 'app-breed-edit',
  standalone: true,
  imports: [NavComponent, BreedEditFormComponent, ErrorDisplayComponent],
  templateUrl: './breed-edit.component.html',
  styleUrl: './breed-edit.component.css',
})
export class BreedEditComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  breedService: BreedService = inject(BreedService)

  breedId: string = ''
  breed!: Breed

  errorMessages: string[] = []

  constructor() {
    this.breedId = this.route.snapshot.params['id']

    this.breedService.getBreed(this.breedId).then((breed: Breed) => {
      this.breed = breed
    })
  }

  onErrorMessagesChange(messages: string[]): void {
    this.errorMessages = messages
  }
}
