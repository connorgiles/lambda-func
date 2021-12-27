export type LambdaHandler<TEvent = any, TContext = any, TResponse = void> = (
  event: TEvent,
  context: TContext
) => Promise<TResponse>

export type Controller<TWrapper> = TWrapper extends (arg: infer U, ...args: unknown[]) => unknown ? U : never
