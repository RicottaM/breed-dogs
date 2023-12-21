import { Component, inject } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { BreedService } from '../../services/breeds/breed.service'
import { DogService } from '../../services/dogs/dog.service'
import { DOG_NAMES } from '../../constants/constants'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  leafIcon = faLeaf
  breedService: BreedService = inject(BreedService)
  dogService: DogService = inject(DogService)

  initBreeds(): void {
    this.breedService.initBreeds()
  }

  removeBreeds(): void {
    this.breedService.removeBreeds()
  }

  async initDogs(): Promise<void> {
    const breeds = await this.breedService.getAllBreeds()

    if (DOG_NAMES.length >= breeds.length) {
      breeds.forEach((breed, index) => {
        const randomAge = Math.floor(Math.random() * (15 - 1 + 1)) + 1

        this.dogService.addDog(DOG_NAMES[index], randomAge, breed.id)
      })
    } else {
      console.log('To little dog names for all breeds.')
    }
  }

  removeDogs(): void {
    this.dogService.removeDogs()
  }
}
