import { APIGatewayProxyResult } from 'aws-lambda'
import { LambdaHandler } from '@lambda-func/core'

export type HTTPResponseParameters = {
  statusCode?: number
  headers?: APIGatewayProxyResult['headers']
  isBase64Encoded?: boolean
}

export const httpResponse =
  <TEvent, TContext = unknown, TResponse = unknown>(params?: HTTPResponseParameters) =>
  (
    handler: LambdaHandler<TEvent, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, APIGatewayProxyResult> =>
  async (event, context) => {
    const result = await handler(event, context)
    const isString = typeof result === 'string'

    const contentType = isString ? 'text/plain' : 'application/json'
    const body = isString ? result : JSON.stringify(result)

    return {
      statusCode: 200,
      body: body,
      ...params,
      headers: {
        'Content-Type': contentType,
        ...params?.headers
      }
    }
  }
