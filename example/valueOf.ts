import ClassEnum from '../src/ClassEnum'

export default class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT'))
