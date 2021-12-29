import { SNSEventRecord, SNSEvent } from 'aws-lambda'

export type ParsedSNSRecord<TBody = unknown> = Omit<SNSEventRecord, 'Sns'> & {
  Sns: Omit<SNSEventRecord['Sns'], 'Message'> & { Message: TBody }
}

export type ParsedSNSEvent<TBody = unknown> = Omit<SNSEvent, 'Records'> & {
  Records: ParsedSNSRecord<TBody>[]
}
