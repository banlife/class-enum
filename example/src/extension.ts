import { ClassEnum } from '../../src'

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal('DOG', 'My Dog', 3)
  public static readonly CAT = new Animal('CAT', 'Cute Cat', 6)

  private readonly title!: string
  private readonly age!: number

  public constructor(value: string, title: string, age: number) {
    super(value)
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
