import { ClassEnum } from '../src'
import { EnumNotFound } from '../src/exception'

test('Enum simple reference matching', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
  }

  expect(Animal.DOG).toBe(Animal.DOG)
})

test('Enum name is resolved from static property name', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
  }

  expect(Animal.DOG.name()).toBe('DOG')
  expect(Animal.CAT.name()).toBe('CAT')
})

test('Enum equals', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
  }

  expect(Animal.DOG.equals(Animal.DOG)).toBeTruthy()
  expect(Animal.DOG.equals(Animal.CAT)).toBeFalsy()
})

test('Enum simple reference matching with title', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('my dog')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  expect(Animal.DOG).toBe(Animal.DOG)
  expect(Animal.DOG.title).toBe('my dog')
})

test('The count of ClassEnum types', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('my dog')
    public static readonly CAT = new Animal('my cat')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  const animals = Animal.values()

  expect(animals.length).toBe(2)
})

test('The values contains all values in declaration order', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  const animals = Animal.values()

  expect(animals[0]).toBe(Animal.DOG)
  expect(animals[1]).toBe(Animal.CAT)
})

test('Collects only ClassEnum types', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')
    public static readonly OTHER = 1

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  const animals = Animal.values()

  expect(animals.length).toBe(2)
})

test('Collects only same types of ClassEnum', () => {
  class Other extends ClassEnum<Other> {
    public static readonly OTHER = new Other('other')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')
    public static readonly CAT = new Animal('cat')
    public static readonly OTHER = Other.OTHER

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  const animals = Animal.values()

  expect(animals.length).toBe(2)
})

test("The dog-enum can't be cat-enum", () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('my dog')
    public static readonly CAT = new Animal('my cat')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  const dog = Animal.valueOf('DOG')

  expect(dog).not.toBe(Animal.CAT)
})

test('If the enum is not found, error occurs', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('my dog')
    public static readonly CAT = new Animal('my cat')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  expect(() => Animal.valueOf('MOUSE')).toThrow(EnumNotFound)
})

test('Returns ETC if specified defaultValue in valueOf', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('my dog')
    public static readonly ETC = new Animal('etc')

    readonly title: string

    public constructor(title: string) {
      super()
      this.title = title
    }
  }

  const etc = Animal.valueOf('MOUSE', Animal.ETC)

  expect(etc).toBe(Animal.ETC)
})

test('Enum instances do not expose a value property', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
  }

  expect(Object.prototype.hasOwnProperty.call(Animal.DOG, 'value')).toBeFalsy()
})

test('Enum string representation uses enum name', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
  }

  expect(String(Animal.DOG)).toBe('DOG')
  expect(Object.prototype.toString.call(Animal.DOG)).toBe('[object DOG]')
})

test('Enum name and equals work with proxied enum instances', () => {
  class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
  }

  const proxyDog = new Proxy(Animal.DOG, {})

  expect(proxyDog.name()).toBe('DOG')
  expect(String(proxyDog)).toBe('DOG')
  expect(Animal.DOG.equals(proxyDog)).toBeTruthy()
  expect(proxyDog.equals(Animal.DOG)).toBeTruthy()
  expect(Animal.CAT.equals(proxyDog)).toBeFalsy()
})

test('Enum name must be declared as static property', () => {
  class Animal extends ClassEnum<Animal> {}

  const dog = new Animal()

  expect(() => dog.name()).toThrow(EnumNotFound)
})
