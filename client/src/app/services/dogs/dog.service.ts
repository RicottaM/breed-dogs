import { Injectable } from '@angular/core'
import { Dog } from '../../models/dog.model'

@Injectable({
  providedIn: 'root',
})
export class DogService {
  dogUrl: string = 'http://localhost:8082/dogs'
  testUrl: string = 'http://localhost:3000/dogs'

  constructor() {}

  async getAllDogs(): Promise<Dog[]> {
    const dogs = await fetch(this.dogUrl)

    return (await dogs.json()) ?? []
  }

  async getDog(dogId: string): Promise<Dog> {
    const dog = await fetch(`${this.dogUrl}/${dogId}`)

    return (await dog.json()) ?? undefined
  }

  async editDog(id: string, name: string, age: number) {
    const updatedDogData = {
      name: name,
      age: age,
    }

    await fetch(`${this.dogUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDogData),
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
        console.error('There was a problem with the create operation:', error)
      })
  }

  async addDog(name: string, age: number, breed: string): Promise<void> {
    const dogData = {
      name: name,
      age: age,
      breed: breed,
    }

    await fetch(this.dogUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogData),
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
        console.error('There was a problem with the create operation:', error)
      })
  }

  async deleteDog(id: string): Promise<void> {
    await fetch(`${this.dogUrl}/${id}`, {
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

  async removeDogs(): Promise<void> {
    const dogs = await this.getAllDogs()

    dogs.forEach(dog => {
      this.deleteDog(dog.id)
    })
  }
}
