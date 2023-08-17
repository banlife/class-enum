import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG')
  public static readonly CAT = new Animal('CAT')
  public static readonly ETC = new Animal('ETC')
}

console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT'))
console.log(Animal.valueOf("MONKEY", Animal.ETC))
