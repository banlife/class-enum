import { defineEnum } from '../../src'

const Animal = defineEnum({
  DOG: { title: 'dog' },
  CAT: { title: 'cat' },
  MONKEY: { title: 'monkey' },
})

console.log(Animal.DOG.name())
console.log(Animal.DOG.title)
console.log(Animal.values())
console.log(Animal.valueOf('CAT'))
console.log(Animal.DOG.equals(Animal.CAT))
