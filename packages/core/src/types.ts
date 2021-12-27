export type LambdaHandler<TEvent = unknown, TContext = unknown, TResponse = void> = (
  event: TEvent,
  context: TContext
) => Promise<TResponse>

export type Controller<TWrapper> = TWrapper extends (arg: infer U, ...args: unknown[]) => unknown ? U : never
