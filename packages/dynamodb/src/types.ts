import { DynamoDBRecord, StreamRecord } from 'aws-lambda'

export interface UnmarshalledStreamRecord extends Omit<StreamRecord, 'NewImage' | 'OldImage'> {
  NewImage?: unknown | undefined
  OldImage?: unknown | undefined
}

export interface UnmarshalledDynamoDBRecord extends Omit<DynamoDBRecord, 'dynamodb'> {
  dynamodb: UnmarshalledStreamRecord
}
