# class-enum

class-enum은 typescript enum을 대체하기 위하여 만들어졌습니다.  
typescript의 enum은 숫자, 문자열 정도의 형식만 지원하기 때문에 추가적인 기능 확장에 아쉬움이 있습니다. 따라서 생성자 지원이 가능한 자바 형태의 enum을 만들기로 했습니다.

## 설치

### NPM

```bash
$ npm i class-enum
```

## 설정

### typescript

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
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

### valueOf(s: string)

value 문자열로부터 Enum을 찾아옵니다.

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // occurs EnumNotFound exception
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

## 쓰임새

작성예정