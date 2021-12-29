import { DynamoDBRecord, DynamoDBStreamEvent } from 'aws-lambda'
import { UnmarshalledDynamoDBRecord } from './types'

export const createDynamoDBRecord = (partial?: Partial<DynamoDBRecord>): DynamoDBRecord => ({
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
  partials: Array<Partial<DynamoDBRecord> | undefined> = [undefined]
): DynamoDBStreamEvent => ({
  Records: partials.map(createDynamoDBRecord)
})

export const createUnmarshalledDynamoDBRecord = (
  partial?: Partial<UnmarshalledDynamoDBRecord>
): UnmarshalledDynamoDBRecord => ({
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
