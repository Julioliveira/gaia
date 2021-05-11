export interface ObjectValidator<T> {
  isValid(objectToValidate: object): boolean
  validator: T
}
