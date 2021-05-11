import { Controller } from '@/presentation/protocols'
import { ExampleController } from '@/presentation/controllers'
import { makeExampleValidation } from './exampleValidationFactory'
import { makeDbExample } from './exampleUsecaseFactory'

export const makeExampleController = (): Controller => {
  const patientController = new ExampleController(
    makeDbExample(),
    makeExampleValidation()
  )
  return patientController
}
