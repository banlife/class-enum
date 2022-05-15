import ClassEnum from '../src/ClassEnum'
import Enum from '../src/Enum'

@Enum
class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

console.log(Animal.values())
