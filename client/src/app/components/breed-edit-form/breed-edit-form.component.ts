import { Component, Input, Output, EventEmitter, inject } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { BreedService } from '../../services/breeds/breed.service'
import { Breed } from '../../models/breed.model'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-breed-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './breed-edit-form.component.html',
  styleUrl: './breed-edit-form.component.css',
})
export class BreedEditFormComponent {
  @Input() breed!: Breed

  breedService: BreedService = inject(BreedService)

  @Output() errorMessagesChange = new EventEmitter<string[]>()
  errorMessages: string[] = []

  applyForm = new FormGroup({
    name: new FormControl<string>('', [Validators.minLength(2)]),
    averageAge: new FormControl<number | undefined>(undefined, [
      Validators.min(1),
      Validators.max(30),
      Validators.pattern(/^[0-9]*$/),
    ]),
  })

  async submitForm() {
    this.errorMessages = []

    if (this.applyForm.value.name || this.applyForm.value.averageAge) {
      if (!this.applyForm.value.name) {
        this.applyForm.value.name = this.breed.name
      }
      if (!this.applyForm.value.averageAge) {
        this.applyForm.value.averageAge = this.breed.averageAge
      }

      if (this.applyForm.valid) {
        this.breedService.editBreed(
          this.breed.id,
          this.applyForm.value.name ?? '',
          Number(this.applyForm.value.averageAge),
        )
      } else {
        if (this.applyForm.get('name')?.hasError('minlength')) {
          this.errorMessages.push('● Name must be at least 2 characters long.')
        }
        if (this.applyForm.get('averageAge')?.hasError('pattern')) {
          this.errorMessages.push('● Age must be a valid number.')
        }
        if (this.applyForm.get('averageAge')?.hasError('min') || this.applyForm.get('averageAge')?.hasError('max')) {
          this.errorMessages.push('● Age must be between 1 and 30.')
        }

        this.errorMessagesChange.emit(this.errorMessages)
      }
    }
  }
}
