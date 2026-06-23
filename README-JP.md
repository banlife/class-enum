![npm:version](https://flat.badgen.net/npm/v/class-enum)

[English](README.md) | [한국어](README-KR.md) | [日本語](README-JP.md) | [中文](README-CN.md)

# class-enum

`class-enum` は TypeScript enum の代替として使えるライブラリです。

TypeScript enum は数値や文字列などの primitive 値を中心に扱うため、各 enum 値に追加データや振る舞いを持たせるのが難しくなります。`class-enum` を使うと、コンストラクタ、メソッド、カスタムプロパティを持つ Java スタイルの enum を定義しながら、`values()`、`valueOf()`、`equals()` などの便利な機能も利用できます。

## インストール

### NPM

```bash
$ npm i class-enum
```

## 使い方

`class-enum` には enum を定義する方法が 2 つあります。

ほとんどの場合は `defineEnum` を使います。オブジェクトベースの簡潔な構文で、`values()`、`valueOf()`、`name()`、`equals()` を利用できます。

```typescript
const Animal = defineEnum({
    DOG: { title: '犬' },
    CAT: { title: '猫' },
})
```

コンストラクタ、メソッド、private field などのクラス機能が必要な場合は `ClassEnum` を使います。

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('犬')

    private constructor(private readonly title: string) {
        super()
    }
}
```

## 例

### オブジェクトから定義する

`defineEnum` を使うと、クラスを宣言せずに enum を定義できます。

```typescript
import { defineEnum } from 'class-enum'

const Animal = defineEnum({
    DOG: { title: '犬' },
    CAT: { title: '猫' },
    MONKEY: { title: '猿' },
})

Animal.DOG.name() // "DOG"
Animal.DOG.title // "犬"
Animal.values() // [ Object [DOG] { title: '犬' }, Object [CAT] { title: '猫' }, Object [MONKEY] { title: '猿' } ]
Animal.valueOf('CAT') // Animal.CAT
Animal.DOG.equals(Animal.CAT) // false
```

### ClassEnum で定義する

`ClassEnum` を継承して enum を定義できます。  
各 enum 値の名前は static property 名から解決されます。

```typescript
import { ClassEnum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
    public static readonly MOUSE = "foo" // ClassEnum では除外されます
}
```

### 拡張

enum 値には追加プロパティを持たせることができます。たとえば `DOG` に `title` と `age` を持たせられます。  
通常のクラスと同じようにコンストラクタ引数を追加し、インスタンスに代入します。

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

すべての enum 値を配列で返します。

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

指定した名前に一致する enum 値を返します。一致する値がない場合は `EnumNotFound` 例外が発生します。  
`defaultEnum` を指定した場合は、例外を投げる代わりにその値を返します。

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // EnumNotFound 例外が発生
```

```typescript
console.log(Animal.valueOf("MONKEY", Animal.ETC))
```

### name()

enum 値の名前を返します。

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### toString()

enum 名を文字列として取得します。

```typescript
console.log(String(Animal.DOG)) // "DOG"
```

### equals(e: Enum)

2 つの enum 値が同じかどうかを比較します。
Vue や Valtio のように状態ライブラリが enum 値を Proxy で包む場合でも動作します。

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
```

## フレームワーク例

### Vue.js

次の例は、選択された enum 値に応じて label と color を表示する方法を示しています。

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

次の例は、React state に enum 値を保持する方法を示しています。

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

## テスト

```bash
$ npm run clean
$ npm run test
```

## 例の実行

TypeScript の例は、実行前にコンパイルします。

```bash
$ npm run build:example
```

## ビルドと公開

```bash
$ npm run build
$ npm publish
```
