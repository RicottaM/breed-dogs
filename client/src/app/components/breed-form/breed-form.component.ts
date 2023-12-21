import { Component, EventEmitter, Output, inject } from '@angular/core'
import { BreedService } from '../../services/breeds/breed.service'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-breed-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './breed-form.component.html',
  styleUrl: './breed-form.component.css',
})
export class BreedFormComponent {
  breedService: BreedService = inject(BreedService)

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    averageAge: new FormControl(undefined, [
      Validators.required,
      Validators.min(1),
      Validators.max(30),
      Validators.pattern(/^[0-9]*$/),
    ]),
  })

  @Output() errorMessagesChange = new EventEmitter<string[]>()
  errorMessages: string[] = []

  pawIcon = faPaw

  constructor() {}

  submitForm(): void {
    this.errorMessages = []

    if (this.applyForm.valid) {
      this.breedService.addBreed(this.applyForm.value.name ?? '', Number(this.applyForm.value.averageAge) ?? undefined)
    } else {
      if (this.applyForm.get('name')?.hasError('required')) {
        this.errorMessages.push('● Name is required.')
      }

      if (this.applyForm.get('name')?.hasError('minlength')) {
        this.errorMessages.push('● Name must be at least 2 characters long.')
      }

      if (this.applyForm.get('averageAge')?.hasError('required')) {
        this.errorMessages.push('● Average age is required.')
      }

      if (this.applyForm.get('averageAge')?.hasError('pattern')) {
        this.errorMessages.push('● Average age must be a valid number.')
      }

      if (this.applyForm.get('averageAge')?.hasError('min') || this.applyForm.get('averageAge')?.hasError('max')) {
        this.errorMessages.push('● Average age must be between 1 and 30.')
      }
    }

    this.errorMessagesChange.emit(this.errorMessages)
  }
}
