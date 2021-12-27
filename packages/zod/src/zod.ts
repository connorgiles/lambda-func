import { LambdaHandler } from '@cg-lambda/core'
import { z } from 'zod'

export const zodParser =
  <TZod extends z.ZodRawShape, TEvent, TContext, TResponse>(model: z.ZodObject<TZod>) =>
  (
    handler: LambdaHandler<z.infer<typeof model>, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(model.passthrough().parse(event), context)
