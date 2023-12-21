import { Component, inject } from '@angular/core'
import { NavComponent } from '../../nav/nav.component'
import { BreedService } from '../../../services/breeds/breed.service'
import { ActivatedRoute } from '@angular/router'
import { Breed } from '../../../models/breed.model'
import { CommonModule } from '@angular/common'
import { ContainerTitleComponent } from '../../container-title/container-title.component'
import { Dog } from '../../../models/dog.model'
import { DogService } from '../../../services/dogs/dog.service'

@Component({
  selector: 'app-breed-details',
  standalone: true,
  imports: [NavComponent, CommonModule, ContainerTitleComponent],
  templateUrl: './breed-details.component.html',
  styleUrl: './breed-details.component.css',
})
export class BreedDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  breedService: BreedService = inject(BreedService)
  dogService: DogService = inject(DogService)

  breedId: string = ''
  breed!: Breed
  dogsRelated: Dog[] = []

  constructor() {
    this.breedId = this.route.snapshot.params['id']

    this.breedService
      .getBreed(this.breedId)
      .then((breed: Breed) => {
        this.breed = breed
      })
      .then(() => {
        this.dogService.getAllDogs().then((dogs: Dog[]) => {
          this.dogsRelated = dogs.filter((dog: Dog) => dog.breed === this.breed.id)
        })
      })
  }
}
