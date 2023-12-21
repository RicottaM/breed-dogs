import { Component, inject } from '@angular/core'
import { Breed } from '../../models/breed.model'
import { BreedService } from '../../services/breeds/breed.service'
import { CommonModule } from '@angular/common'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-breed-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './breed-section.component.html',
  styleUrl: './breed-section.component.css',
})
export class BreedSectionComponent {
  breeds: Breed[] = []
  breedService: BreedService = inject(BreedService)

  trashIcon = faTrashCan
  editIcon = faEdit
  detailsIcon = faCircleInfo

  constructor() {
    this.breedService.getAllBreeds().then((breeds: Breed[]) => {
      this.breeds = breeds
    })
  }

  editBreed(): void {}

  deleteBreed(id: string): void {
    this.breedService.deleteBreed(id)
  }
}
