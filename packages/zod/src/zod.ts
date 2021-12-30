import { z } from 'zod'

import { LambdaHandler } from '@lambda-func/core'
import { UnprocessableEntity } from '@lambda-func/errors'

const mapError = (error: z.ZodError) =>
  new UnprocessableEntity(
    'Invalid Request',
    error.issues.map((i) => ({
      code: i.code,
      path: i.path.join('.'),
      message: i.message
    }))
  )

export const zodParser =
  <TZod extends z.ZodRawShape, TEvent, TContext, TResponse>(model: z.ZodObject<TZod>) =>
  (
    handler: LambdaHandler<z.infer<typeof model>, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) => {
    const result = model.safeParse(event)

    if (!result.success) {
      throw mapError(result.error)
    }

    return handler(result.data, context)
  }
