import { InputValidation } from '@/presentation/protocols'
import { ObjectValidatorAdapter } from '@/infra/validators'
import { ExampleValidation } from '@/validation/validators'

export const makeExampleValidation = (): InputValidation => {
  return new ExampleValidation(new ObjectValidatorAdapter())
}
