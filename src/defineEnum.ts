import { EnumNotFound } from './exception'

const enumOwner: symbol = Symbol('defineEnum.owner')

type EnumDefinition = Record<string, Record<string, unknown>>

type EnumValue<Name extends string, Payload extends Record<string, unknown>> =
  Readonly<Payload> & {
    name(): Name
    toString(): Name
    equals(e: unknown): boolean
    readonly [Symbol.toStringTag]: Name
  }

type EnumValueLike = {
  name(): string
  equals(e: unknown): boolean
}

export type DefinedEnum<T extends EnumDefinition> = {
  readonly [K in keyof T]: EnumValue<K & string, T[K]>
} & {
  values(): Array<DefinedEnum<T>[keyof T]>
  valueOf<K extends keyof T & string>(name: K): DefinedEnum<T>[K]
  valueOf(name: string): DefinedEnum<T>[keyof T]
  valueOf<K extends keyof T & string>(
    name: string,
    defaultEnum: DefinedEnum<T>[K],
  ): DefinedEnum<T>[K] | DefinedEnum<T>[keyof T]
}

export type EnumType<T> = T extends { values(): Array<infer V> } ? V : never

export function defineEnum<T extends EnumDefinition>(
  definition: T,
): DefinedEnum<T> {
  const owner = {}
  const enumObject: Record<string, unknown> = {}
  const enumValues: Record<string, EnumValue<string, Record<string, unknown>>> =
    {}

  for (const name of Object.keys(definition)) {
    const enumValue = createEnumValue(owner, name, definition[name])
    enumValues[name] = enumValue
    enumObject[name] = enumValue
  }

  Object.defineProperty(enumObject, 'values', {
    value: () => Object.keys(enumValues).map((name) => enumValues[name]),
    enumerable: false,
  })

  Object.defineProperty(enumObject, 'valueOf', {
    value: (
      name: string,
      defaultEnum: EnumValue<string, Record<string, unknown>> | null = null,
    ) => {
      if (name in enumValues) {
        return enumValues[name]
      }

      if (defaultEnum !== null) {
        return defaultEnum
      }

      throw new EnumNotFound(name)
    },
    enumerable: false,
  })

  return Object.freeze(enumObject) as DefinedEnum<T>
}

function createEnumValue<Name extends string>(
  owner: object,
  name: Name,
  payload: Record<string, unknown>,
): EnumValue<Name, Record<string, unknown>> {
  const enumValue = { ...payload } as Record<string, unknown>

  Object.defineProperty(enumValue, 'name', {
    value: () => name,
    enumerable: false,
  })

  Object.defineProperty(enumValue, 'toString', {
    value: () => name,
    enumerable: false,
  })

  Object.defineProperty(enumValue, 'equals', {
    value: (e: unknown) => {
      if (!isDefinedEnumValue(e)) {
        return false
      }

      return (
        getOwner(enumValue) === getOwner(e) && name === e.name()
      )
    },
    enumerable: false,
  })

  Object.defineProperty(enumValue, enumOwner, {
    value: owner,
    enumerable: false,
  })

  Object.defineProperty(enumValue, Symbol.toStringTag, {
    get: () => name,
    enumerable: false,
  })

  return Object.freeze(enumValue) as EnumValue<Name, Record<string, unknown>>
}

function isDefinedEnumValue(e: unknown): e is EnumValueLike {
  return (
    typeof e === 'object' &&
    e !== null &&
    typeof (e as { name?: unknown }).name === 'function' &&
    typeof (e as { equals?: unknown }).equals === 'function'
  )
}

function getOwner(e: unknown): unknown {
  return (e as Record<symbol, unknown>)[enumOwner]
}
