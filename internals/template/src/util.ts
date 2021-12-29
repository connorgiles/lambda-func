import { LambdaHandler } from '@lambda-func/core'

export const select =
  <TEvent, TSelected = unknown, TContext = unknown, TResponse = unknown>(
    select: (event: TEvent) => TSelected
  ) =>
  (handler: LambdaHandler<TSelected, TContext, TResponse>): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(select(event), context)
