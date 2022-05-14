import { EnumNotFound } from './exception/ClassEnumException'

export default abstract class ClassEnum<T> {
  private readonly value!: string

  protected constructor(value: string) {
    this.value = value
  }

  public static values<T>(): T[] {
    const enums = this.getEnums<T>()
    return Object.values(enums)
  }

  private static getEnums<T>(): { [index: string]: T } {
    const classEnums: { [index: string]: T } = {}
    for (const name of Object.getOwnPropertyNames(this)) {
      if (name === 'prototype') {
        continue
      }

      const descriptor = Object.getOwnPropertyDescriptor(this, name)
      if (!descriptor || descriptor.value.constructor.name !== this.name) {
        continue
      }

      classEnums[name] = descriptor.value
    }

    return classEnums
  }

  public static valueOf<T>(value: string): T {
    const enums = this.getEnums<T>()
    if (!(value in enums)) {
      throw new EnumNotFound(value)
    }
    return enums[value]
  }

  public name(): string {
    return this.value
  }

  public equals(e: ClassEnum<T>) {
    return this === e && this.value === e.value
  }
}
