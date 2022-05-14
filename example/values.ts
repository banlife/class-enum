import ClassEnum from '../src/ClassEnum'

export default class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG')
  public static readonly CAT = new Animal('CAT')
}

console.log(Animal.values())
