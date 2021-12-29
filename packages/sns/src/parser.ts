import { LambdaHandler } from '@lambda-func/core'
import { SNSEventRecord } from 'aws-lambda'
import { ParsedSNSRecord } from './types'

export const parseSNSMessage =
  <TEvent extends SNSEventRecord, TContext = unknown, TResponse = unknown>() =>
  (
    handler: LambdaHandler<ParsedSNSRecord, TContext, TResponse>
  ): LambdaHandler<TEvent, TContext, TResponse> =>
  (event, context) =>
    handler(
      {
        ...event,
        Sns: {
          ...event.Sns,
          Message: JSON.parse(event.Sns.Message)
        }
      },
      context
    )
