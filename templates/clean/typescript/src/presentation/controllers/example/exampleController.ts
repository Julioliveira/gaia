import {
  HttpResponse,
  Controller,
  ExampleInterface,
  HttpRequest,
  InputValidation
} from './exampleProtocols'
import {
  serverError,
  success,
  unprocessableEntity
} from '@/presentation/helpers/httpHelper'

export class ExampleController implements Controller {
  constructor(
    private readonly example: ExampleInterface,
    private readonly validation: InputValidation
  ) {}

  async handle(
    request: ExampleController.Request
  ): Promise<HttpResponse> {
    try {
      const { params } = request
      const error = this.validation.validate(params)
      if (error) {
        return unprocessableEntity(error)
      }
      return success(
        await this.example.exampleFunction(+params.id)
      )
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace ExampleController {
  export interface Request extends HttpRequest {
    params: {
      id: number
    }
  }
}
