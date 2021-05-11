import { ExampleInterface } from '@/domain/usecases'

export interface ExampleRepository {
  exampleFunction(
    params: ExampleInterface.Params
  ): Promise<ExampleInterface.Result>
}

export namespace ExampleRepository {
  export type Params = ExampleInterface.Params
  export type Result = ExampleInterface.Result
}
