import ClassEnum from './ClassEnum'

export default function Enum<T extends { new (...args: any[]): ClassEnum<T> }>(
  constructor: T
) {
  for (const name of Object.getOwnPropertyNames(constructor)) {
    if (name === 'prototype') {
      continue
    }

    const descriptor = Object.getOwnPropertyDescriptor(constructor, name)
    if (!descriptor || !(descriptor.value instanceof constructor)) {
      continue
    }

    descriptor.value.value = name
  }
}
