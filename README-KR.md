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

`ClassEnum`클래스 상속을 통하여 상수를 선언합니다. Enum 이름은 static property 이름을 사용합니다.

```typescript
import { ClassEnum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
    public static readonly MOUSE = "foo" // ignored in ClassEnum
}
```

### 확장

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

## 기능

### values()

Enum 값을 모두 가져옵니다.

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

### valueOf(s: string)

static property 이름으로부터 Enum을 찾아옵니다.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // occurs EnumNotFound exception
```

### valueOf(s: string, defaultEnum: Enum = null)

static property 이름으로부터 Enum을 찾아옵니다.

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

static property 이름을 가져옵니다.

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### toString()

Enum 이름을 문자열로 가져옵니다.

```typescript
console.log(String(Animal.DOG)) // "DOG"
```

### equals(e: Enum)

같은 Enum 인스턴스인지 비교합니다.
Vue, Valtio처럼 상태 값을 Proxy로 감싸는 환경에서도 같은 Enum 이름이면 동일하게 비교됩니다.

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
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

## 예제 실행

TypeScript 예제 파일은 먼저 컴파일한 뒤 실행합니다.

```bash
$ npm run example:equals
$ npm run example:extension
$ npm run example:name
$ npm run example:valueOf
$ npm run example:values
```
