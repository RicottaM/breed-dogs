import { Routes } from '@angular/router'
import { DogsComponent } from './components/views/dogs/dogs.component'
import { BreedsComponent } from './components/views/breeds/breeds.component'
import { NotFoundComponent } from './components/views/not-found/not-found.component'
import { DogEditComponent } from './components/views/dog-edit/dog-edit.component'
import { BreedEditComponent } from './components/views/breed-edit/breed-edit.component'
import { BreedDetailsComponent } from './components/views/breed-details/breed-details.component'
import { DogDetailsComponent } from './components/views/dog-details/dog-details.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Breeds',
    component: BreedsComponent,
  },
  {
    path: 'dogs',
    component: DogsComponent,
    title: 'Dogs',
  },
  {
    path: 'dog-edit/:id',
    component: DogEditComponent,
    title: 'Edit Dog',
  },
  {
    path: 'breed-edit/:id',
    component: BreedEditComponent,
    title: 'Edit Breed',
  },
  {
    path: 'breed-details/:id',
    component: BreedDetailsComponent,
    title: 'Breed Details',
  },
  {
    path: 'dog-details/:id',
    component: DogDetailsComponent,
    title: 'Dog Details',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  },
]
