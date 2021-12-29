import { LambdaHandler } from '@lambda-func/core'

import { Maybe, optionalJsonParse } from './utils'

export type BodyToJsonParameters = {
  throwOnFailure?: boolean
}

const formatJsonBody = (body: Maybe<string>, throwOnFailure?: boolean): unknown => {
  const bodyString = body ?? ''

  if (throwOnFailure) {
    return JSON.parse(bodyString)
  }

  return optionalJsonParse(bodyString)
}

export const bodyToJson =
  <TEvent extends { body?: Maybe<string> } = { body: string }, TContext = unknown, TResponse = unknown>(
    params: BodyToJsonParameters = {}
  ) =>
  (
    handler: LambdaHandler<Omit<TEvent, 'body'> & { body: unknown }, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(
      {
        ...event,
        body: formatJsonBody(event.body, params.throwOnFailure)
      },
      context
    )
