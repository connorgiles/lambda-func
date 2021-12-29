import { LambdaHandler } from '@lambda-func/core'
import { UnprocessableEntity } from '@lambda-func/errors'

const defaultOnFailedPredicate = () => {
  throw new UnprocessableEntity('Event did not meet type predicate')
}

export const guard =
  <TEvent, TNarrowed extends TEvent = TEvent, TContext = unknown, TResponse = unknown>(
    predicate: (event: TEvent) => event is TNarrowed,
    {
      onFailedPredicate
    }: {
      onFailedPredicate: LambdaHandler<TEvent, TContext, TResponse>
    } = {
      onFailedPredicate: defaultOnFailedPredicate
    }
  ) =>
  (handler: LambdaHandler<TNarrowed, TContext, TResponse>): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    predicate(event) ? handler(event, context) : onFailedPredicate(event, context)
