![npm:version](https://flat.badgen.net/npm/v/class-enum)

# class-enum

The "class-enum" was developed to replace the TypeScript enum.   
Since TypeScript's enum only supports formats like numbers and strings, it is lacking in terms of feature expansion.  
As a result, we decided to create an enum similar to Java's style that supports constructors.  
The "class-enum" can be used in the same way as class constants and offers several convenient features.

## Installing

### NPM

```bash
$ npm i class-enum
```

## Example

### Define enum from an object

Use `defineEnum` to define an enum without declaring a class.

```typescript
import { defineEnum } from 'class-enum'

const Animal = defineEnum({
    DOG: { title: 'dog' },
    CAT: { title: 'cat' },
    MONKEY: { title: 'monkey' },
})

Animal.DOG.name() // "DOG"
Animal.DOG.title // "dog"
Animal.values() // [ Object [DOG] { title: 'dog' }, Object [CAT] { title: 'cat' }, Object [MONKEY] { title: 'monkey' } ]
Animal.valueOf('CAT') // Animal.CAT
Animal.DOG.equals(Animal.CAT) // false
```

### Define 'Animal' enum

This library allows you to create enumerations by inheriting ClassEnum<?> from a class.  
The enum name is resolved from the static property name.

```typescript
import { ClassEnum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
    public static readonly MOUSE = "foo" // ignored in ClassEnum
}
```

### Extending

Sometimes, we need additional attributes for a value. For example, 'DOG' can have values like 'title' and 'color'.  
Simply increase the arguments in the constructor and add the values, and that's it.

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('My Dog', 3)
    public static readonly CAT = new Animal('Cute Cat', 6)

    private readonly title!: string
    private readonly age!: number

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

Animal.DOG.printTitle() // My Dog
console.log(`cat age: ${Animal.CAT.getAge()}`) // cat age: 6

```

## API

### values()

Retrieve all the values of the Enum as an array.

```typescript
console.log(Animal.values()) // [ Animal [DOG] {}, Animal [CAT] {} ]
```

```typescript
Animal.values().map((animal: Animal) => {
    console.log(animal.name())
})

// DOG -> string
// CAT -> string
```

### valueOf(s: string, defaultEnum = null)

Retrieve the Enum using the static property name. If not found, an EnumNotFound exception is raised.  
However If you specify the defaultEnum, that will be returned instead.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // occurs EnumNotFound exception
```

```typescript
console.log(Animal.valueOf("MONKEY", Animal.ETC))
```

### name()

Retrieve the static property name of the Enum.

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### toString()

Retrieve the enum name as a string.

```typescript
console.log(String(Animal.DOG)) // "DOG"
```

### equals(e: Enum)

Compare if they are the same Enum instance.
It also works when state libraries such as Vue or Valtio wrap enum instances in proxies.

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
```

## Vue.js

Here's an example of displaying different names and colors based on the selected animal(Enum).

```vue
<template>
  <select v-model="selectedAnimal">
    <option v-for="animal in Animal.values()" :key="animal.name()" :value="animal">{{ animal.title }}</option>
  </select>

  <p :style="{color: selectedAnimal.color}">selected:{{ selectedAnimal.name() }}</p>
</template>

<script setup lang="ts">
import { ClassEnum } from "class-enum";
import { ref } from "vue";

class Animal extends ClassEnum<Animal> {
  public static readonly DOG = new Animal("cute dog", "red");
  public static readonly CAT = new Animal("beautiful cat", "green");
  public static readonly MONKEY = new Animal("big money", "blue");

  public readonly title!: string;
  public readonly color!: string;

  public constructor(title: string, color: string) {
    super();
    this.title = title;
    this.color = color;
  }
}

const selectedAnimal = ref(Animal.DOG);
</script>

```

## Test

```bash
$ npm run clean
$ npm run test
```

## Run Examples

The TypeScript example files are compiled before execution.

```bash
$ npm run example:equals
$ npm run example:extension
$ npm run example:name
$ npm run example:valueOf
$ npm run example:values
$ npm run example:defineEnum
```

## Build/Deploy

```bash
$ npm run clean
$ npm run build
$ npm publish
```
