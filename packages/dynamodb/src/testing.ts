import { DynamoDBRecord, StreamRecord, DynamoDBStreamEvent } from 'aws-lambda'
import { DeepPartial } from '@lambda-func/core'

export type PartialDynamoDBRecord = DeepPartial<DynamoDBRecord> & {
  dynamodb?: Pick<StreamRecord, 'Keys' | 'NewImage' | 'OldImage'>
}

export const createDynamoDBRecord = (partial?: PartialDynamoDBRecord): DynamoDBRecord => ({
  awsRegion: '',
  eventID: '',
  eventName: 'INSERT',
  eventSource: '',
  eventSourceARN: '',
  eventVersion: '',
  ...partial,
  dynamodb: {
    ApproximateCreationDateTime: 0,
    SequenceNumber: '',
    SizeBytes: 0,
    StreamViewType: 'NEW_IMAGE',
    Keys: {},
    NewImage: {},
    OldImage: {},
    ...partial?.dynamodb
  }
})

export const createDynamoDBStreamEvent = (
  partials: Array<PartialDynamoDBRecord | undefined> = [undefined]
): DynamoDBStreamEvent => ({
  Records: partials.map(createDynamoDBRecord)
})
