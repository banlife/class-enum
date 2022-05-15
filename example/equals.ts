import { ClassEnum, Enum } from '../src'

@Enum
class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

@Enum
class Other extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
}

console.log(Animal.DOG.equals(Animal.DOG))
console.log(Animal.DOG.equals(Animal.CAT))
console.log(Animal.DOG.equals(Other.DOG))
