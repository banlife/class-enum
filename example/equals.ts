import ClassEnum from '../src/ClassEnum'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG')
  public static readonly CAT = new Animal('CAT')
}

class Other extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG')
}

console.log(Animal.DOG.equals(Animal.DOG))
console.log(Animal.DOG.equals(Animal.CAT))
console.log(Animal.DOG.equals(Other.DOG))
