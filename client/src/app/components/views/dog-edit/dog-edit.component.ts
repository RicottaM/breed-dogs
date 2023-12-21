import { Component, inject } from '@angular/core'
import { NavComponent } from '../../nav/nav.component'
import { ActivatedRoute } from '@angular/router'
import { DogService } from '../../../services/dogs/dog.service'
import { Dog } from '../../../models/dog.model'
import { DogEditFormComponent } from '../../dog-edit-form/dog-edit-form.component'
import { BreedService } from '../../../services/breeds/breed.service'
import { Breed } from '../../../models/breed.model'
import { ErrorDisplayComponent } from '../../error-display/error-display.component'

@Component({
  selector: 'app-dog-edit',
  standalone: true,
  imports: [NavComponent, DogEditFormComponent, ErrorDisplayComponent],
  templateUrl: './dog-edit.component.html',
  styleUrl: './dog-edit.component.css',
})
export class DogEditComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  dogService: DogService = inject(DogService)
  breedService: BreedService = inject(BreedService)

  dogId: string = ''
  breedName: string = ''
  dog!: Dog

  errorMessages: string[] = []

  constructor() {
    this.dogId = this.route.snapshot.params['id']

    this.dogService
      .getDog(this.dogId)
      .then((dog: Dog) => {
        this.dog = dog
      })
      .then(() =>
        this.breedService.getBreed(this.dog.breed).then((breed: Breed) => {
          this.breedName = breed.name
        }),
      )
  }

  onErrorMessagesChange(messages: string[]): void {
    this.errorMessages = messages
  }
}
