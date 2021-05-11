import { ObjectValidator } from '@/validation/protocols'
import Joi, { AnySchema } from 'joi'

export class ObjectValidatorAdapter implements ObjectValidator<typeof Joi, AnySchema> {
  isValid(schema: AnySchema, objectToValidate: object): string[] | null {
    const { error } = schema.validate(objectToValidate, { abortEarly: false })
    if (error) return error.details.map((d) => d.message)
    return null
  }

  validator = Joi
}
