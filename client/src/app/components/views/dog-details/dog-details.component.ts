import { Component, inject } from '@angular/core'
import { NavComponent } from '../../nav/nav.component'
import { ActivatedRoute } from '@angular/router'
import { Breed } from '../../../models/breed.model'
import { BreedService } from '../../../services/breeds/breed.service'
import { Dog } from '../../../models/dog.model'
import { DogService } from '../../../services/dogs/dog.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-dog-details',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.css',
})
export class DogDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  breedService: BreedService = inject(BreedService)
  dogService: DogService = inject(DogService)

  dogId: string = ''
  breedName: string = ''
  dog!: Dog

  constructor() {
    this.dogId = this.route.snapshot.params['id']

    this.dogService
      .getDog(this.dogId)
      .then((dog: Dog) => {
        this.dog = dog
      })
      .then(() => {
        this.breedService.getBreed(this.dog.breed).then((breed: Breed) => {
          this.breedName = breed.name
        })
      })
  }
}
