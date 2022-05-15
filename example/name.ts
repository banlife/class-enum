import ClassEnum from '../src/ClassEnum'
import Enum from '../src/Enum'

@Enum
class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
}

console.log(Animal.DOG.name())
