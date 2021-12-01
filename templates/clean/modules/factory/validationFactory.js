export function createValidationFactory(options) {
  return `import { InputValidation } from '@/presentation/protocols'
import { ObjectValidatorAdapter } from '@/infra/validators'
import { ${options.capitalizedModuleName}Validation } from '@/validation/validators'

export const make${options.capitalizedModuleName}Validation = (): InputValidation => {
  return new ${options.capitalizedModuleName}Validation(new ObjectValidatorAdapter())
}
`
}
