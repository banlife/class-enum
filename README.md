# class-enum

class-enum은 typescript enum을 대체하기 위하여 만들어졌습니다. typescript의 enum은 숫자, 문자열 정도의 형식만 지원하기 때문에 추가적인 기능 확장에 아쉬움이 있습니다. 따라서 생성자
지원이 가능한 자바 형태의 enum을 만들기로 했습니다.

## 기본 예제

### 기본

`ClassEnum`클래스 상속을 통하여 상수를 선언하면 됩니다.

> 첫 번째 인자 값은 어쩔 수 없이 강제사항입니다. 가능하다면 상수명을 문자열로 지정합니다.

```typescript
import ClassEnum from "class-enum"

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('DOG')
    public static readonly CAT = new Animal('CAT')
    public static readonly MOUSE = "foo" // ignored in ClassEnum
}
```

### values()

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('DOG')
    public static readonly CAT = new Animal('CAT')
}

console.log(Animal.values()) // [ Animal {}, Animal {} ]
```

### valueOf

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('DOG')
    public static readonly CAT = new Animal('CAT')
}

console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT'))
```

### equals

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('DOG')
    public static readonly CAT = new Animal('CAT')
}

class Other extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('DOG')
}

console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
console.log(Animal.DOG.equals(Other.DOG)) // false
```

## 쓰임새

작성예정