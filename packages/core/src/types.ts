export type LambdaHandler<TEvent = any, TContext = any, TResponse = void> = (
  event: TEvent,
  context: TContext
) => Promise<TResponse>

export type LambdaMiddleware<TInner extends LambdaHandler, TOuter extends LambdaHandler> = (
  inner: TInner
) => TOuter
