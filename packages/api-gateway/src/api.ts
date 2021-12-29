import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { compose } from '@lambda-func/core'

import { httpResponse, HTTPResponseParameters } from './http-response'
import { httpErrorSerializer, HTTPErrorSerializerParameters } from './http-error-serializer'

export type APIGatewayParameters = {
  response?: HTTPResponseParameters
  errorSerializer?: HTTPErrorSerializerParameters
}

const handler = <TResponse>(params?: APIGatewayParameters) =>
  compose(
    httpErrorSerializer<APIGatewayProxyEvent, Context>(params?.errorSerializer),
    httpResponse<APIGatewayProxyEvent, Context, TResponse>(params?.response)
  )

class APIGatewayWrapper<TResponse> {
  // using class to ensure exported type can be generic while being inferred
  /* istanbul ignore next */
  handler = handler<TResponse>()
}

export const apiGateway = <TResponse>(
  params?: APIGatewayParameters
): APIGatewayWrapper<TResponse>['handler'] => handler<TResponse>(params)
