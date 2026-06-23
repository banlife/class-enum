import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('My Dog', 3)
  public static readonly CAT = new Animal('Cute Cat', 6)
  public static readonly ETC = new Animal('Etc', 0)

  private readonly title: string
  private readonly age: number

  public constructor(title: string, age: number) {
    super()
    this.title = title
    this.age = age
  }

  public printTitle() {
    console.log(this.title)
  }

  public getAge() {
    return this.age
  }
}

console.log(Animal.DOG.name())
console.log(Animal.values())

Animal.values().forEach((animal) => {
  console.log(animal.name())
})

console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('MONKEY', Animal.ETC))

Animal.DOG.printTitle()
console.log(`cat age: ${Animal.CAT.getAge()}`)

console.log(Animal.DOG.equals(Animal.DOG))
console.log(Animal.DOG.equals(Animal.CAT))
