import { ExampleInterface } from '@/domain/usecases'
import { ExampleRepository } from '@/data/protocols/db'
export class DbExample implements ExampleInterface {
  constructor(private readonly example: ExampleRepository) {}

  async exampleFunction(
    param: ExampleInterface.Params
  ): Promise<ExampleInterface.Result> {
    return await this.example.exampleFunction(param)
  }
}
