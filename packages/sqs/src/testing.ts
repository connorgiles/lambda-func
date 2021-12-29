import { SQSRecord, SQSEvent } from 'aws-lambda'
import { DeepPartial } from '@cg-lambda/core'

import { ParsedSQSRecord, ParsedSQSEvent } from './types'

export type PartialSQSRecord = DeepPartial<SQSRecord> & {
  messageAttributes?: Partial<SQSRecord>['messageAttributes']
}

export const createSQSRecord = (partial?: PartialSQSRecord): SQSRecord => ({
  awsRegion: '',
  eventSource: '',
  eventSourceARN: '',
  md5OfBody: '',
  messageId: '',
  receiptHandle: '',
  body: '',
  messageAttributes: {},
  ...partial,
  attributes: {
    ApproximateFirstReceiveTimestamp: '',
    ApproximateReceiveCount: '',
    SenderId: '',
    SentTimestamp: '',
    AWSTraceHeader: '',
    ...partial?.attributes
  }
})

export const createSQSEvent = (partials: Array<PartialSQSRecord | undefined> = [undefined]): SQSEvent => ({
  Records: partials.map(createSQSRecord)
})

export const createParsedSQSRecord = <TBody>({
  body,
  ...partial
}: Omit<PartialSQSRecord, 'body'> & { body: TBody }): ParsedSQSRecord<TBody> => ({
  ...createSQSRecord(partial),
  body
})

export const createParsedSQSEvent = <TBody>(
  partials: Array<Omit<PartialSQSRecord, 'body'> & { body: TBody }>
): ParsedSQSEvent<TBody> => ({
  Records: partials.map(createParsedSQSRecord)
})
