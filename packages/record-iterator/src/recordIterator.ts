import { LambdaHandler } from '@cg-lambda/core'

export const recordIterator =
  <
    TRecord,
    TEvent extends { Records: TRecord[] } = { Records: TRecord[] },
    TContext = unknown,
    TResponse = unknown
  >() =>
  (handler: LambdaHandler<TRecord, TContext, TResponse>): LambdaHandler<TEvent, TContext, TResponse[]> =>
  (event, context) =>
    Promise.all(event.Records.map((record) => handler(record, context)))
