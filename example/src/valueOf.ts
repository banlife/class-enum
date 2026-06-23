import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
  public static readonly ETC = new Animal()
}

console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
try {
  console.log(Animal.valueOf('PARROT'))
} catch (e) {
  console.log(e)
}
console.log(Animal.valueOf('MONKEY', Animal.ETC))
