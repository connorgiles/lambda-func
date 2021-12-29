import { SQSBatchResponse, SQSEvent } from 'aws-lambda'
import { LambdaHandler } from '@lambda-func/core'

export type SQSRecordIteratorParameters = {
  reportBatchItemFailure?: boolean
}

export const sqsRecordIterator =
  <TEvent extends SQSEvent, TContext = unknown>({
    reportBatchItemFailure = true
  }: SQSRecordIteratorParameters = {}) =>
  (
    handler: LambdaHandler<TEvent['Records'][number], TContext, void>
  ): LambdaHandler<TEvent, TContext, SQSBatchResponse> =>
  async (event, context) => {
    const failures: string[] = []

    for (const record of event.Records) {
      try {
        await handler(record, context)
      } catch (error) {
        if (!reportBatchItemFailure) throw error

        failures.push(record.messageId)
      }
    }

    return {
      batchItemFailures: failures.map((id) => ({ itemIdentifier: id }))
    }
  }
