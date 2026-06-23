import { EnumNotFound } from './exception'

const enumName = Symbol('ClassEnum.name')

type ClassEnumClass<T extends ClassEnum<T>> = Function & {
  readonly prototype: T
}

type NamedClassEnum = ClassEnum<unknown> & {
  readonly [enumName]?: string
}

export default abstract class ClassEnum<T> {
  public static values<T extends ClassEnum<T>>(
    this: ClassEnumClass<T>,
  ): T[] {
    const enums = ClassEnum.getEnums(this)
    return Object.keys(enums).map((name) => enums[name])
  }

  public static valueOf<T extends ClassEnum<T>>(
    this: ClassEnumClass<T>,
    name: string,
  ): T
  public static valueOf<T extends ClassEnum<T>>(
    this: ClassEnumClass<T>,
    name: string,
    defaultEnum: T,
  ): T
  public static valueOf<T extends ClassEnum<T>>(
    this: ClassEnumClass<T>,
    name: string,
    defaultEnum: T | null = null,
  ): T {
    const enums = ClassEnum.getEnums(this)
    if (!(name in enums)) {
      if (defaultEnum !== null) {
        return defaultEnum
      }
      throw new EnumNotFound(name)
    }
    return enums[name]
  }

  private static getEnums<T extends ClassEnum<T>>(
    enumClass: ClassEnumClass<T>,
  ): { [index: string]: T } {
    const classEnums: { [index: string]: T } = {}
    for (const name of Object.getOwnPropertyNames(enumClass)) {
      if (name === 'prototype' || name === 'length' || name === 'name') {
        continue
      }

      const descriptor = Object.getOwnPropertyDescriptor(enumClass, name)
      if (!descriptor || !(descriptor.value instanceof enumClass)) {
        continue
      }

      classEnums[name] = descriptor.value
      ClassEnum.setName(descriptor.value, name)
    }

    return classEnums
  }

  private static setName(target: ClassEnum<unknown>, name: string): void {
    if (ClassEnum.getName(target) !== undefined) {
      return
    }

    Object.defineProperty(target, enumName, {
      value: name,
      enumerable: false,
    })
  }

  private static getName(target: ClassEnum<unknown>): string | undefined {
    return (target as NamedClassEnum)[enumName]
  }

  public name(): string {
    const currentName = ClassEnum.getName(this)
    if (currentName !== undefined) {
      return currentName
    }

    const enumClass = this.constructor as ClassEnumClass<ClassEnum<unknown>>
    ClassEnum.getEnums(enumClass)

    const resolvedName = ClassEnum.getName(this)
    if (resolvedName !== undefined) {
      return resolvedName
    }

    throw new EnumNotFound(this.constructor.name)
  }

  public toString(): string {
    return this.name()
  }

  public get [Symbol.toStringTag](): string {
    return this.name()
  }

  public equals(e: T): boolean {
    if (Object.is(this, e)) {
      return true
    }

    if (!(e instanceof ClassEnum)) {
      return false
    }

    try {
      return this.constructor === e.constructor && this.name() === e.name()
    } catch (e) {
      return false
    }
  }
}
