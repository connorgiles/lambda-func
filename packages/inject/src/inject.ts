import { LambdaHandler } from '@cg-lambda/core'

export const inject =
  <TKey extends string, TInject, TEvent, TContext, TResponse>(key: TKey, injection: TInject) =>
  (
    handler: LambdaHandler<TEvent, TContext & { [k in TKey]: TInject }, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(event, Object.assign(context, { [key]: injection } as { [k in TKey]: TInject }))
