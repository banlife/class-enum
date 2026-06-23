![npm:version](https://flat.badgen.net/npm/v/class-enum)

# class-enum

`class-enum`은 TypeScript enum의 대안으로 사용할 수 있는 라이브러리입니다.

TypeScript enum은 숫자와 문자열 같은 primitive 값 위주로 동작하기 때문에 각 enum 값에 추가 데이터나 동작을 붙이기 어렵습니다. `class-enum`은 생성자, 메서드, 커스텀 속성을 가진 Java 스타일 enum을 정의하면서도 `values()`, `valueOf()`, `equals()` 같은 편의 기능을 제공합니다.

## 설치

### NPM

```bash
$ npm i class-enum
```

## 사용법

`class-enum`은 enum을 정의하는 두 가지 방식을 제공합니다.

대부분의 경우에는 `defineEnum`을 사용하면 됩니다. 객체 기반의 간결한 문법으로 `values()`, `valueOf()`, `name()`, `equals()`를 사용할 수 있습니다.

```typescript
const Animal = defineEnum({
    DOG: { title: '강아지' },
    CAT: { title: '고양이' },
})
```

생성자, 메서드, private field 같은 클래스 기능이 필요하다면 `ClassEnum`을 사용합니다.

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('강아지')

    private constructor(private readonly title: string) {
        super()
    }
}
```

## 예제

### 객체로 정의

`defineEnum`을 사용하면 클래스 선언 없이 enum을 정의할 수 있습니다.

```typescript
import { defineEnum } from 'class-enum'

const Animal = defineEnum({
    DOG: { title: '강아지' },
    CAT: { title: '고양이' },
    MONKEY: { title: '원숭이' },
})

Animal.DOG.name() // "DOG"
Animal.DOG.title // "강아지"
Animal.values() // [ Object [DOG] { title: '강아지' }, Object [CAT] { title: '고양이' }, Object [MONKEY] { title: '원숭이' } ]
Animal.valueOf('CAT') // Animal.CAT
Animal.DOG.equals(Animal.CAT) // false
```

### ClassEnum으로 정의

`ClassEnum`을 상속해서 enum을 정의할 수 있습니다.  
각 enum 값의 이름은 static property 이름에서 가져옵니다.

```typescript
import { ClassEnum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
    public static readonly MOUSE = "foo" // ClassEnum에서 제외됩니다
}
```

### 확장

enum 값에는 추가 속성을 둘 수 있습니다. 예를 들어 `DOG`는 `title`과 `age`를 가질 수 있습니다.  
일반 클래스처럼 생성자 인자를 추가하고 인스턴스에 할당하면 됩니다.

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

모든 enum 값을 배열로 반환합니다.

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

주어진 이름에 해당하는 enum 값을 반환합니다. 일치하는 값이 없다면 `EnumNotFound` 예외가 발생합니다.  
`defaultEnum`을 지정하면 예외를 던지는 대신 해당 값을 반환합니다.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // EnumNotFound 예외 발생
```

```typescript
console.log(Animal.valueOf("MONKEY", Animal.ETC))
```

### name()

enum 값의 이름을 반환합니다.

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### toString()

enum 이름을 문자열로 반환합니다.

```typescript
console.log(String(Animal.DOG)) // "DOG"
```

### equals(e: Enum)

두 enum 값이 같은지 비교합니다.
Vue, Valtio처럼 상태 값을 Proxy로 감싸는 환경에서도 동작합니다.

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
```

## 프레임워크 예제

### Vue.js

다음 예제는 선택된 enum 값에 따라 label과 color를 표시하는 방법을 보여줍니다.

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

다음 예제는 React state에 enum 값을 보관하는 방법을 보여줍니다.

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

## 테스트

```bash
$ npm run clean
$ npm run test
```

## 예제 실행

TypeScript 예제는 실행 전에 컴파일합니다.

```bash
$ npm run build:example
```

## 빌드와 배포

```bash
$ npm run build
$ npm publish
```
