import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const successfullyCreated = (
  data:
  | {
    status: boolean
    message: string
  }
  | Record<string, unknown>
): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: Error | string[] | null): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const unprocessableEntity = (
  error: Error | string[] | null
): HttpResponse => ({
  statusCode: 422,
  body: error
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverError = (error: any): HttpResponse => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(error))
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
