import { LambdaHandler } from '@lambda-func/core'

export const bodyToJson =
  <TEvent extends { body: string } = { body: string }, TContext = unknown, TResponse = unknown>() =>
  (
    handler: LambdaHandler<Omit<TEvent, 'body'> & { body: unknown }, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(
      {
        ...event,
        body: JSON.parse(event.body)
      },
      context
    )
