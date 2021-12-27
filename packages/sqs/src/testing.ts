import { SQSRecord, SQSEvent } from 'aws-lambda'
import { ParsedSQSRecord, ParsedSQSEvent } from './types'

export const createSQSRecord = (partial?: Partial<SQSRecord>): SQSRecord => ({
  attributes: {
    ApproximateFirstReceiveTimestamp: '',
    ApproximateReceiveCount: '',
    SenderId: '',
    SentTimestamp: '',
    AWSTraceHeader: ''
  },
  awsRegion: '',
  eventSource: '',
  eventSourceARN: '',
  md5OfBody: '',
  messageAttributes: {},
  messageId: '',
  receiptHandle: '',
  body: '',
  ...partial
})

export const createSQSEvent = (partials: Array<Partial<SQSRecord> | undefined> = [undefined]): SQSEvent => ({
  Records: partials.map(createSQSRecord)
})

export const createParsedSQSRecord = <TBody>({
  body,
  ...partial
}: Partial<Omit<ParsedSQSRecord, 'body'>> & { body: TBody }): ParsedSQSRecord<TBody> => ({
  ...createSQSRecord(partial),
  body
})

export const createParsedSQSEvent = <TBody>(
  partials: Array<Partial<Omit<ParsedSQSRecord, 'body'>> & { body: TBody }>
): ParsedSQSEvent<TBody> => ({
  Records: partials.map(createParsedSQSRecord)
})
