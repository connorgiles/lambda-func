import { DynamoDBStreamEvent, Context } from 'aws-lambda'
import { compose } from '@lambda-func/core'
import { recordIterator } from '@lambda-func/record-iterator'
import { unmarshallDynamoDBRecord } from './unmarshall'

export const dynamodb = () =>
  compose(recordIterator<DynamoDBStreamEvent, Context, void>(), unmarshallDynamoDBRecord())
