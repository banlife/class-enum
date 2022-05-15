import { ClassEnum, Enum } from '../src'

@Enum
class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
}

console.log(Animal.DOG.name())
