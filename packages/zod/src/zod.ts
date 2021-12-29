import { z } from 'zod'

import { LambdaHandler } from '@lambda-func/core'
import { UnprocessableEntity } from '@lambda-func/errors'

export const zodParser =
  <TZod extends z.ZodRawShape, TEvent, TContext, TResponse>(model: z.ZodObject<TZod>) =>
  (
    handler: LambdaHandler<z.infer<typeof model>, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) => {
    const result = model.passthrough().safeParse(event)

    if (!result.success) {
      throw new UnprocessableEntity()
    }

    return handler(result.data, context)
  }
