import { APIGatewayProxyResult } from 'aws-lambda'
import { LambdaHandler } from '@lambda-func/core'
import { isHandlerError, InternalServerError, HandlerError } from '@lambda-func/errors'

export type HTTPErrorSerializerParameters = {
  headers?: APIGatewayProxyResult['headers']
}

export const handlerErrorToAPIResult = (
  error: HandlerError,
  params?: HTTPErrorSerializerParameters
): APIGatewayProxyResult => ({
  statusCode: error.statusCode,
  body: JSON.stringify(error),
  ...params,
  headers: {
    'Content-Type': 'application/json',
    ...params?.headers
  }
})

export const httpErrorSerializer =
  <TEvent, TContext = unknown>(params?: HTTPErrorSerializerParameters) =>
  (
    handler: LambdaHandler<TEvent, TContext, APIGatewayProxyResult>
  ): LambdaHandler<TEvent, TContext, APIGatewayProxyResult> =>
  async (event, context) => {
    try {
      return await handler(event, context)
    } catch (error) {
      if (error instanceof Error && isHandlerError(error)) {
        return handlerErrorToAPIResult(error, params)
      }

      return handlerErrorToAPIResult(new InternalServerError(), params)
    }
  }
