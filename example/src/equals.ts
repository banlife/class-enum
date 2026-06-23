import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

console.log(Animal.DOG.equals(Animal.DOG))
console.log(Animal.DOG.equals(Animal.CAT))
