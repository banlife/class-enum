import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

console.log(Animal.values())

Animal.values().map((animal) => {
  console.log(animal.name())
})
