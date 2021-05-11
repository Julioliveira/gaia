/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Validation {
  validate: (input: any) => Error | undefined
}

export interface InputValidation {
  validate: (input: Record<string, unknown>) => string[] | null
}
