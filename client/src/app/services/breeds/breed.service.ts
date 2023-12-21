import { Injectable } from '@angular/core'
import { Breed } from '../../models/breed.model'
import { BREED_AVERAGE_AGES, BREED_NAMES } from '../../constants/constants'

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  private breedUrl: string = 'http://localhost:8081/breeds'

  constructor() {}

  async getAllBreeds(): Promise<Breed[]> {
    const breeds = await fetch(this.breedUrl)

    return (await breeds.json()) ?? []
  }

  async getBreed(breedId: string): Promise<Breed> {
    const breed = await fetch(`${this.breedUrl}/${breedId}`)

    return (await breed.json()) ?? undefined
  }

  async initBreeds() {
    BREED_NAMES.forEach((breedName, index) => {
      this.addBreed(breedName, BREED_AVERAGE_AGES[index])
    })
  }

  async editBreed(id: string, name: string, averageAge: number) {
    const breedUpdatedData = {
      name: name,
      averageAge: averageAge,
    }

    await fetch(`${this.breedUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(breedUpdatedData),
    })
      .then(response => {
        if (!response.ok) {
          if (response instanceof Error) {
            throw new Error(response.message)
          }
          throw new Error('Something wrong happened!')
        }
      })
      .then(() => {
        window.location.reload()
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }

  async addBreed(name: string, averageAge: number): Promise<any> {
    const breedData = {
      name: name,
      averageAge: averageAge,
    }

    await fetch(this.breedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(breedData),
    })
      .then(response => {
        if (!response.ok) {
          if (response instanceof Error) {
            throw new Error(response.message)
          }
          throw new Error('Something wrong happened!')
        }
      })
      .then(() => {
        window.location.reload()
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }

  async deleteBreed(id: string): Promise<void> {
    await fetch(`${this.breedUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          if (response instanceof Error) {
            throw new Error(response.message)
          }
          throw new Error('Something wrong happened!')
        }
      })
      .then(() => {
        window.location.reload()
      })
      .catch(error => {
        console.error('There was a problem with the delete operation:', error)
      })
  }

  async removeBreeds(): Promise<void> {
    const breeds = await this.getAllBreeds()

    breeds.forEach(breed => {
      this.deleteBreed(breed.id)
    })
  }
}
