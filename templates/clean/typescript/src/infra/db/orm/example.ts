import { ExampleRepository } from '@/data/protocols/db'
export class ExampleOrmRepository implements ExampleRepository {
  async exampleFunction(
    params: ExampleRepository.Params
  ): Promise<ExampleRepository.Result> {
    return `This is an example with id ${params}`
  }
}
