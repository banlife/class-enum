![npm:version](https://flat.badgen.net/npm/v/class-enum)

[English](README.md) | [한국어](README-KR.md) | [日本語](README-JP.md) | [中文](README-CN.md)

# class-enum

`class-enum` 是一个可替代 TypeScript enum 的库。

TypeScript enum 主要面向数字、字符串等 primitive 值，因此很难为每个 enum 值附加额外数据或行为。`class-enum` 允许你定义带有构造函数、方法和自定义属性的 Java 风格 enum，同时保留 `values()`、`valueOf()`、`equals()` 等便捷功能。

## 安装

### NPM

```bash
$ npm i class-enum
```

## 使用方法

`class-enum` 提供两种定义 enum 的方式。

大多数情况下可以使用 `defineEnum`。它提供简洁的对象式语法，并支持 `values()`、`valueOf()`、`name()`、`equals()`。

```typescript
const Animal = defineEnum({
    DOG: { title: '狗' },
    CAT: { title: '猫' },
})
```

当你需要构造函数、方法或 private field 等类特性时，可以使用 `ClassEnum`。

```typescript
class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal('狗')

    private constructor(private readonly title: string) {
        super()
    }
}
```

## 示例

### 从对象定义 enum

使用 `defineEnum` 可以在不声明 class 的情况下定义 enum。

```typescript
import { defineEnum } from 'class-enum'

const Animal = defineEnum({
    DOG: { title: '狗' },
    CAT: { title: '猫' },
    MONKEY: { title: '猴子' },
})

Animal.DOG.name() // "DOG"
Animal.DOG.title // "狗"
Animal.values() // [ Object [DOG] { title: '狗' }, Object [CAT] { title: '猫' }, Object [MONKEY] { title: '猴子' } ]
Animal.valueOf('CAT') // Animal.CAT
Animal.DOG.equals(Animal.CAT) // false
```

### 使用 ClassEnum 定义

可以通过继承 `ClassEnum` 来定义 enum。  
每个 enum 值的名称会从 static property 名称解析而来。

```typescript
import { ClassEnum } from 'class-enum'

class Animal extends ClassEnum<Animal> {
    public static readonly DOG = new Animal()
    public static readonly CAT = new Animal()
    public static readonly MOUSE = "foo" // 在 ClassEnum 中会被忽略
}
```

### 扩展

enum 值可以拥有额外属性。例如，`DOG` 可以拥有 `title` 和 `age`。  
像普通 class 一样添加构造函数参数，并将它们赋值到实例即可。

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

以数组形式返回所有 enum 值。

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

返回指定名称对应的 enum 值。如果没有匹配的值，会抛出 `EnumNotFound` 异常。  
如果提供了 `defaultEnum`，则返回该值而不是抛出异常。

```typescript
console.log(Animal.valueOf('DOG'))
console.log(Animal.valueOf('CAT'))
console.log(Animal.valueOf('PARROT')) // 发生 EnumNotFound 异常
```

```typescript
console.log(Animal.valueOf("MONKEY", Animal.ETC))
```

### name()

返回 enum 值的名称。

```typescript
console.log(Animal.DOG.name()) // "DOG"
```

### toString()

以字符串形式取得 enum 名称。

```typescript
console.log(String(Animal.DOG)) // "DOG"
```

### equals(e: Enum)

检查两个 enum 值是否相同。
当 Vue、Valtio 等状态库用 Proxy 包装 enum 值时也可以正常工作。

```typescript
console.log(Animal.DOG.equals(Animal.DOG)) // true
console.log(Animal.DOG.equals(Animal.CAT)) // false
```

## 框架示例

### Vue.js

下面的示例展示如何根据选中的 enum 值显示 label 和 color。

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

下面的示例展示如何在 React state 中保存 enum 值。

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

## 测试

```bash
$ npm run clean
$ npm run test
```

## 运行示例

运行 TypeScript 示例前，请先进行编译。

```bash
$ npm run build:example
```

## 构建与发布

```bash
$ npm run build
$ npm publish
```
