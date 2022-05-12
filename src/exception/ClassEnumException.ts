export class EnumNotFound extends Error {
  constructor(value: string) {
    super(`'${value}' is an invalid value in ClassEnum`)
  }
}
