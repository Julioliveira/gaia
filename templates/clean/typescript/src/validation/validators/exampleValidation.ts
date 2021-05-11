import { InputValidation } from '@/presentation/protocols'
import { ObjectValidatorAdapter } from '@/infra/validators'

export class ExampleValidation implements InputValidation {
  constructor(
    private readonly objectValidatorAdapter: ObjectValidatorAdapter
  ) {}

  validate(input: Record<string, string | unknown>): string[] | null {
    const { validator, isValid } = this.objectValidatorAdapter
    const exampleSchema = validator.object({
      id: validator.number().required()
    })

    return isValid(exampleSchema, input)
  }
}
