# class-enum

class-enum은 typescript enum을 대체하기 위하여 만들어졌습니다. typescript의 enum은 숫자, 문자열 정도의 형식만 지원하기 때문에 추가적인 기능 확장에 아쉬움이 있습니다. 따라서 자바
형태의 enum을 만들기로 했습니다.

## 기능

### ClassEnum 정의

Animal.ts

```typescript
import ClassEnum from "class-enum";

export default class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal
    public static readonly CAT = new Animal
    public static readonly MOUSE = "MOUSE"
}
```

### 전체 값

```typescript
console.log(Animal.values())

```