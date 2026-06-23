import { defineEnum, EnumType } from '../src'
import { EnumNotFound } from '../src/exception'

test('defineEnum creates enum values from object keys', () => {
  const Animal = defineEnum({
    DOG: { title: 'dog' },
    CAT: { title: 'cat' },
  })
  type Animal = EnumType<typeof Animal>
  const dog: Animal = Animal.DOG

  expect(dog.name()).toBe('DOG')
  expect(dog.title).toBe('dog')
  expect(String(Animal.CAT)).toBe('CAT')
  expect(Object.prototype.toString.call(Animal.CAT)).toBe('[object CAT]')
})

test('defineEnum values and valueOf', () => {
  const Animal = defineEnum({
    DOG: { title: 'dog' },
    CAT: { title: 'cat' },
    ETC: { title: 'etc' },
  })

  expect(Animal.values()).toEqual([Animal.DOG, Animal.CAT, Animal.ETC])
  expect(Animal.valueOf('DOG')).toBe(Animal.DOG)
  expect(Animal.valueOf('MOUSE', Animal.ETC)).toBe(Animal.ETC)
  expect(() => Animal.valueOf('MOUSE')).toThrow(EnumNotFound)
})

test('defineEnum values are frozen', () => {
  const Animal = defineEnum({
    DOG: { title: 'dog' },
  })

  expect(Object.isFrozen(Animal)).toBeTruthy()
  expect(Object.isFrozen(Animal.DOG)).toBeTruthy()
})

test('defineEnum equals works with proxied enum values', () => {
  const Animal = defineEnum({
    DOG: { title: 'dog' },
    CAT: { title: 'cat' },
  })

  const proxyDog = new Proxy(Animal.DOG, {})

  expect(proxyDog.name()).toBe('DOG')
  expect(Animal.DOG.equals(proxyDog)).toBeTruthy()
  expect(proxyDog.equals(Animal.DOG)).toBeTruthy()
  expect(Animal.CAT.equals(proxyDog)).toBeFalsy()
})

test('defineEnum equals does not match values from another enum', () => {
  const Animal = defineEnum({
    DOG: { title: 'dog' },
  })
  const Other = defineEnum({
    DOG: { title: 'dog' },
  })

  expect(Animal.DOG.equals(Other.DOG)).toBeFalsy()
})
