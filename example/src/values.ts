import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG')
  public static readonly CAT = new Animal('CAT')
}

console.log(Animal.values())

Animal.values<Animal>().map((animal: Animal) => {
    console.log(animal.name())
})
