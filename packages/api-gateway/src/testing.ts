import { APIGatewayProxyEvent } from 'aws-lambda'
import { DeepPartial } from '@lambda-func/core'

import { ParsedAPIGatewayProxyEvent } from './types'

export const createAPIGatewayEvent = (partial?: DeepPartial<APIGatewayProxyEvent>): APIGatewayProxyEvent => ({
  httpMethod: '',
  headers: {},
  isBase64Encoded: false,
  path: '',
  pathParameters: {},
  queryStringParameters: {},
  body: '',
  resource: '',
  stageVariables: null,
  ...partial,
  requestContext: { ...partial?.requestContext } as APIGatewayProxyEvent['requestContext'],
  multiValueHeaders: {},
  multiValueQueryStringParameters: {}
})

export const createParsedAPIGatewayEvent = <TBody>(
  partial?: DeepPartial<ParsedAPIGatewayProxyEvent<TBody>> & { body: TBody }
): ParsedAPIGatewayProxyEvent<TBody> => ({
  httpMethod: '',
  headers: {},
  isBase64Encoded: false,
  path: '',
  pathParameters: {},
  queryStringParameters: {},
  resource: '',
  stageVariables: null,
  body: {} as TBody,
  ...partial,
  requestContext: { ...partial?.requestContext } as APIGatewayProxyEvent['requestContext'],
  multiValueHeaders: {},
  multiValueQueryStringParameters: {}
})
