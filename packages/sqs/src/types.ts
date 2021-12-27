import { SQSRecord, SQSEvent } from 'aws-lambda'

export type ParsedSQSRecord<TBody = unknown> = Omit<SQSRecord, 'body'> & { body: TBody }
export type ParsedSQSEvent<TBody = unknown> = Omit<SQSEvent, 'Records'> & {
  Records: ParsedSQSRecord<TBody>[]
}
