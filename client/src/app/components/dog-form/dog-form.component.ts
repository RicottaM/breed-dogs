import { Component, EventEmitter, Output, inject } from '@angular/core'
import { DogService } from '../../services/dogs/dog.service'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { BreedService } from '../../services/breeds/breed.service'

@Component({
  selector: 'app-dog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.css',
})
export class DogFormComponent {
  @Output() errorMessagesChange = new EventEmitter<string[]>()

  dogService: DogService = inject(DogService)
  breedService: BreedService = inject(BreedService)

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    age: new FormControl(undefined, [
      Validators.required,
      Validators.min(1),
      Validators.max(30),
      Validators.pattern(/^[0-9]*$/),
    ]),
    breed: new FormControl('', [Validators.required]),
  })

  dogIcon = faDog

  constructor() {}

  async submitForm() {
    const errorMessages: string[] = []

    if (this.applyForm.valid) {
      const breeds = await this.breedService.getAllBreeds()
      const breedFound = breeds.find(breed => breed.name === this.applyForm.value.breed)

      if (breedFound) {
        this.dogService.addDog(this.applyForm.value.name ?? '', Number(this.applyForm.value.age), breedFound.id ?? '')
      } else {
        errorMessages.push(`● Selected breed not found in the list of breeds.`)
      }
    } else {
      if (this.applyForm.get('name')?.hasError('required')) {
        errorMessages.push('● Name is required.')
      }

      if (this.applyForm.get('name')?.hasError('minlength')) {
        errorMessages.push('● Name must be at least 2 characters long.')
      }

      if (this.applyForm.get('age')?.hasError('required')) {
        errorMessages.push('● Age is required.')
      }

      if (this.applyForm.get('age')?.hasError('pattern')) {
        errorMessages.push('● Age must be a valid number.')
      }

      if (this.applyForm.get('age')?.hasError('min') || this.applyForm.get('age')?.hasError('max')) {
        errorMessages.push('● Age must be between 1 and 30.')
      }

      if (this.applyForm.get('breed')?.hasError('required')) {
        errorMessages.push('● Breed is required.')
      }
    }

    this.errorMessagesChange.emit(errorMessages)
  }
}
