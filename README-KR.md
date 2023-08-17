![npm:version](https://flat.badgen.net/npm/v/class-enum)

# class-enum

class-enum은 typescript enum을 대체하기 위하여 만들어졌습니다.  
typescript의 enum은 숫자, 문자열 정도의 형식만 지원하기 때문에 추가적인 기능 확장에 아쉬움이 있습니다. 따라서 생성자 지원이 가능한 자바 형태의 enum을 만들기로 했습니다.

## 설치

### NPM

```bash
$ npm i class-enum
```

## 사용방법

### 기본 정의

`ClassEnum`클래스 상속을 통하여 상수를 선언합니다. 첫 번째 인자로 unique value 문자열을 넣습니다.

```typescript
import { ClassEnum, Enum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal("DOG")
    public static readonly CAT = new Animal("CAT")
    public static readonly MOUSE = "foo" // ignored in ClassEnum
}
```

### 확장

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

## 기능

### values()

Enum 값을 모두 가져옵니다.

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

### valueOf(s: string)

value 문자열로부터 Enum을 찾아옵니다.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // occurs EnumNotFound exception
```

### valueOf(s: string, defaultEnum: Enum = null)

value 문자열로부터 Enum을 찾아옵니다.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // occurs EnumNotFound exception
```

문자열로부터 Enum을 찾을 수 없다면 defaultEnum을 반환합니다.

```typescript
console.log(Animal.valueOf("MONKEY", Animal.ETC))
```

### name()

value 문자열을 가져옵니다.

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### equals(e: Enum)

value값을 기준으로 비교합니다.

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
console.log(Animal.DOG.equals(Other.DOG)) // false
```

## Vue.js

선택된 동물(Enum)에 따라서 이름, 색상을 다르게 표시하는 예제입니다.

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