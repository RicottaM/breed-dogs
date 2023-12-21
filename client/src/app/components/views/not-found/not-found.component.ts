import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {}
