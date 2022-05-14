export abstract class ClassEnum<T> {
  private readonly value
  protected constructor(value: string)
  static values<T>(): T[]
  private static getEnums
  static valueOf<T>(value: string): T
  name(): string
  equals(e: ClassEnum<T>): boolean
}
