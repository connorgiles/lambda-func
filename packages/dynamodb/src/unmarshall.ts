import { LambdaHandler } from '@cg-lambda/core'
import { DynamoDB } from 'aws-sdk'
import { DynamoDBRecord } from 'aws-lambda'
import { UnmarshalledDynamoDBRecord } from './types'

export const unmarshallDynamoDBRecord =
  <TContext, TResponse>() =>
  (
    handler: LambdaHandler<UnmarshalledDynamoDBRecord, TContext, TResponse>
  ): LambdaHandler<DynamoDBRecord, TContext, TResponse> =>
  (event, context) =>
    handler(
      {
        ...event,
        dynamodb: {
          ...event.dynamodb,
          NewImage: event.dynamodb?.NewImage
            ? DynamoDB.Converter.unmarshall(event.dynamodb?.NewImage)
            : undefined,
          OldImage: event.dynamodb?.OldImage
            ? DynamoDB.Converter.unmarshall(event.dynamodb?.OldImage)
            : undefined
        }
      },
      context
    )
