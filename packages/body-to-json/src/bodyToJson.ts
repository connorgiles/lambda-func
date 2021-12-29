import { LambdaHandler } from '@lambda-func/core'

import { optionalJsonParse } from './utils'

export type BodyToJsonParameters = {
  throwOnFailure?: boolean
}

export const bodyToJson =
  <TEvent extends { body: string } = { body: string }, TContext = unknown, TResponse = unknown>(
    params: BodyToJsonParameters = {}
  ) =>
  (
    handler: LambdaHandler<Omit<TEvent, 'body'> & { body: unknown }, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(
      {
        ...event,
        body: params.throwOnFailure ? JSON.parse(event.body) : optionalJsonParse(event.body)
      },
      context
    )
