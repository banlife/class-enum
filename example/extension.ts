import { ClassEnum, Enum } from '../src'

@Enum
class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('My Dog', 3)
  public static readonly CAT = new Animal('Cute Cat', 6)

  private readonly title
  private readonly age

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

Animal.DOG.printTitle()
console.log(`cat age: ${Animal.CAT.getAge()}`)
