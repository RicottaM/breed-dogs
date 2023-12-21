import { Component, inject } from '@angular/core'
import { Dog } from '../../models/dog.model'
import { DogService } from '../../services/dogs/dog.service'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faInfo, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from '@angular/router'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dog-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './dog-section.component.html',
  styleUrl: './dog-section.component.css',
})
export class DogSectionComponent {
  dogs: Dog[] = []
  dogService: DogService = inject(DogService)

  trashIcon = faTrashCan
  editIcon = faEdit
  detailsIcon = faInfoCircle

  constructor() {
    this.dogService.getAllDogs().then((dogs: Dog[]) => {
      this.dogs = dogs
    })
  }

  deleteDog(id: string): void {
    this.dogService.deleteDog(id)
  }
}
