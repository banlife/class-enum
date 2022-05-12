import ClassEnum from '../src/ClassEnum'

export default class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal()
  public static readonly CAT = new Animal()
}

const dog = Animal.valueOf<Animal>('DOG')
const cat = Animal.valueOf<Animal>('CAT')

console.log(dog === dog)
console.log(dog === cat)
console.log(dog === Animal.DOG)
console.log(dog === Animal.valueOf<Animal>('DOG'))
