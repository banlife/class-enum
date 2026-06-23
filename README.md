![npm:version](https://flat.badgen.net/npm/v/class-enum)

[English](README.md) | [한국어](README-KR.md) | [日本語](README-JP.md) | [中文](README-CN.md)

# class-enum

`class-enum` provides an alternative to TypeScript enums.

TypeScript enums are limited to primitive values such as numbers and strings, which makes it hard to attach additional data or behavior to each enum value. `class-enum` lets you define Java-style enums with constructors, methods, and custom properties while keeping convenient helpers such as `values()`, `valueOf()`, and `equals()`.

## Installation

### NPM

```bash
$ npm i class-enum
```

## Usage

`class-enum` provides two ways to define enums.

For most cases, use `defineEnum`. It gives you a compact object-based syntax with `values()`, `valueOf()`, `name()`, and `equals()`.

```typescript
const Animal = defineEnum({
    DOG: { title: 'dog' },
    CAT: { title: 'cat' },
})
```

Use `ClassEnum` when you need a Java-style enum with constructors, methods, or private fields.

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('dog')

    private constructor(private readonly title: string) {
        super()
    }
}
```

## Examples

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

You can define an enum by extending `ClassEnum`.  
Each enum value is resolved from its static property name.

```typescript
import { ClassEnum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
    public static readonly MOUSE = "foo" // ignored in ClassEnum
}
```

### Extending

Enum values can have additional properties. For example, `DOG` can have a `title` and an `age`.  
Add constructor arguments and assign them to the instance as you would in a normal class.

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

Returns all enum values as an array.

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

Returns the enum value with the given name. If no matching value exists, `EnumNotFound` is thrown.  
If `defaultEnum` is provided, it is returned instead of throwing.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // occurs EnumNotFound exception
```

```typescript
console.log(Animal.valueOf("MONKEY", Animal.ETC))
```

### name()

Returns the enum value name.

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### toString()

Retrieve the enum name as a string.

```typescript
console.log(String(Animal.DOG)) // "DOG"
```

### equals(e: Enum)

Checks whether two enum values are the same.
This also works when state libraries such as Vue or Valtio wrap enum values in proxies.

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
```

## Framework Examples

### Vue.js

The following example shows how to display a label and color based on the selected enum value.

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
  public static readonly MONKEY = new Animal("big monkey", "blue");

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

### React

The following example shows how to keep an enum value in React state.

```tsx
import { defineEnum, EnumType } from "class-enum";
import { useState } from "react";

const Animal = defineEnum({
  DOG: { title: "cute dog", color: "red" },
  CAT: { title: "beautiful cat", color: "green" },
  MONKEY: { title: "big monkey", color: "blue" },
});

type Animal = EnumType<typeof Animal>;

export function AnimalSelect() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(Animal.DOG);

  return (
    <>
      <select
        value={selectedAnimal.name()}
        onChange={(e) => setSelectedAnimal(Animal.valueOf(e.target.value))}
      >
        {Animal.values().map((animal) => (
          <option key={animal.name()} value={animal.name()}>
            {animal.title}
          </option>
        ))}
      </select>

      <p style={{ color: selectedAnimal.color }}>
        selected: {selectedAnimal.name()}
      </p>
    </>
  );
}
```

## Test

```bash
$ npm run clean
$ npm run test
```

## Run Examples

Compile the TypeScript examples before running them.

```bash
$ npm run build:example
```

## Build and Publish

```bash
$ npm run build
$ npm publish
```
