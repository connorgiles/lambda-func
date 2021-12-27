import { LambdaHandler } from '@cg-lambda/core'

export const recordIterator =
  <
    TEvent extends { Records: unknown[] } = { Records: unknown[] },
    TContext = unknown,
    TResponse = unknown
  >() =>
  (
    handler: LambdaHandler<TEvent['Records'][number], TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse[]> =>
  (event, context) =>
    Promise.all(event.Records.map((record) => handler(record, context)))
