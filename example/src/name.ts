import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG')
}

console.log(Animal.DOG.name())
