export interface ObjectValidator<T, S> {
  isValid: (schema: S, objectToValidate: object) => string[] | null
  validator: T
}
