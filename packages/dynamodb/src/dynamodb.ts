import { DynamoDBStreamEvent, Context } from 'aws-lambda'
import { compose } from '@cg-lambda/core'
import { recordIterator } from '@cg-lambda/record-iterator'
import { unmarshallDynamoDBRecord } from './unmarshall'

export const dynamodb = () =>
  compose(recordIterator<DynamoDBStreamEvent, Context, void>(), unmarshallDynamoDBRecord())

dynamodb()(async (event) => {
  event.dynamodb.NewImage
})
