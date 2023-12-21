import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.css',
})
export class ErrorDisplayComponent {
  @Input() messages: string[] = []

  clearMessages(): void {
    this.messages = []
  }
}
