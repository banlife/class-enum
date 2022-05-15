import { ClassEnum, Enum } from '../src'

@Enum
class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

console.log(Animal.values())
