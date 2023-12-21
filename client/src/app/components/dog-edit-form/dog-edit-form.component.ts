import { Component, Input, Output, EventEmitter, inject } from '@angular/core'
import { Dog } from '../../models/dog.model'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BreedService } from '../../services/breeds/breed.service'
import { DogService } from '../../services/dogs/dog.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-dog-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dog-edit-form.component.html',
  styleUrl: './dog-edit-form.component.css',
})
export class DogEditFormComponent {
  @Input() dog!: Dog
  @Input() breedName!: string

  dogService: DogService = inject(DogService)
  breedService: BreedService = inject(BreedService)

  @Output() errorMessagesChange = new EventEmitter<string[]>()
  errorMessages: string[] = []

  applyForm = new FormGroup({
    name: new FormControl<string>('', [Validators.minLength(2)]),
    age: new FormControl<number | undefined>(undefined, [
      Validators.min(1),
      Validators.max(30),
      Validators.pattern(/^[0-9]*$/),
    ]),
  })

  async submitForm() {
    if (this.applyForm.value.name || this.applyForm.value.age) {
      if (!this.applyForm.value.name) {
        this.applyForm.value.name = this.dog.name
      }
      if (!this.applyForm.value.age) {
        this.applyForm.value.age = this.dog.age
      }

      if (this.applyForm.valid) {
        this.dogService.editDog(
          this.dog.id,
          this.applyForm.value.name ?? this.dog.name,
          Number(this.applyForm.value.age),
        )
      } else {
        this.errorMessages = []

        if (this.applyForm.get('name')?.hasError('minlength')) {
          this.errorMessages.push('● Name must be at least 2 characters long.')
        }

        if (this.applyForm.get('age')?.hasError('pattern')) {
          this.errorMessages.push('● Age must be a valid number.')
        }

        if (this.applyForm.get('age')?.hasError('min') || this.applyForm.get('age')?.hasError('max')) {
          this.errorMessages.push('● Age must be between 1 and 30.')
        }

        this.errorMessagesChange.emit(this.errorMessages)
      }
    }
  }
}
