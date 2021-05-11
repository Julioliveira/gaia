export namespace ExampleInterface {
  export type Params = number
  export type Result = string
}
export interface ExampleInterface {
  exampleFunction(
    params: ExampleInterface.Params
  ): Promise<ExampleInterface.Result>
}
