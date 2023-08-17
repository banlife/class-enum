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

### Define 'Animal' enum

This library allows you to create enumerations by inheriting ClassEnum<?> from a class.  
Please enter the constant variable name as the first argument (of string type). If possible, please follow the rule.

```typescript
import { ClassEnum, Enum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal("DOG")
    public static readonly CAT = new Animal("CAT")
    public static readonly MOUSE = "foo" // ignored in ClassEnum
}
```

### Extending

Sometimes, we need additional attributes for a value. For example, 'DOG' can have values like 'title' and 'color'.  
Simply increase the arguments in the constructor and add the values, and that's it.

```typescript
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

Animal.DOG.printTitle() // My Dog
console.log(`cat age: ${Animal.CAT.getAge()}`) // cat age: 6

```

## API

### values()

Retrieve all the values of the Enum as an array.

```typescript
console.log(Animal.values()) // [ Animal { value: 'DOG' }, Animal { value: 'CAT' } ]
```

```typescript
Animal.values().map((animal: Animal) => {
    console.log(animal.name())
})

// DOG -> string
// CAT -> string
```

### valueOf(s: string, defaultEnum = null)

Retrieve the Enum using the value string. If not found, an EnumNotFound exception is raised.  
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

Retrieve the name of the Enum.

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### equals(e: Enum)

Compare if they are the same Enum based on the value.

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
console.log(Animal.DOG.equals(Other.DOG)) // false
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
  public static readonly DOG = new Animal("DOG", "cute dog", "red");
  public static readonly CAT = new Animal("CAT", "beautiful cat", "green");
  public static readonly MONKEY = new Animal("MONKEY", "big money", "blue");

  public readonly title!: string;
  public readonly color!: string;

  public constructor(value: string, title: string, color: string) {
    super(value);
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

## Build/Deploy

```bash
$ npm run clean
$ npm run build
$ npm publish
```
