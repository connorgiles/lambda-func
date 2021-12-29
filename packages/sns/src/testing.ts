import { SNSEventRecord, SNSEvent } from 'aws-lambda'

import { ParsedSNSRecord } from './types'

export const createSNSRecord = (partial?: Partial<SNSEventRecord['Sns']>): SNSEventRecord => ({
  EventSource: '',
  EventSubscriptionArn: '',
  EventVersion: '',
  Sns: {
    Message: '',
    MessageAttributes: {},
    MessageId: '',
    Signature: '',
    SignatureVersion: '',
    SigningCertUrl: '',
    Subject: '',
    Timestamp: '',
    TopicArn: '',
    Type: '',
    UnsubscribeUrl: '',
    ...partial
  }
})

export const createSNSEvent = (
  partials: Array<Partial<SNSEventRecord['Sns']> | undefined> = [undefined]
): SNSEvent => ({
  Records: partials.map(createSNSRecord)
})

export const createParsedSNSRecord = <TBody>({
  Message,
  ...partial
}: Partial<ParsedSNSRecord<TBody>['Sns']> &
  Pick<ParsedSNSRecord<TBody>['Sns'], 'Message'>): ParsedSNSRecord<TBody> => ({
  ...createSNSRecord(partial),
  Sns: {
    ...createSNSRecord(partial).Sns,
    Message
  }
})
