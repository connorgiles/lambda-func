import { DynamoDB } from 'aws-sdk'
import { AttributeValue } from 'aws-lambda'
import { createContext } from '@lambda-func/core'

import { dynamodb } from './dynamodb'
import { createDynamoDBStreamEvent } from './testing'

describe('dynamodb', () => {
  it('unmarshalles new and old image and iterates over records', async () => {
    const body = { test: 'string' }

    const testEvent = createDynamoDBStreamEvent([
      {
        dynamodb: {
          NewImage: DynamoDB.Converter.marshall(body) as { [k: string]: AttributeValue },
          OldImage: DynamoDB.Converter.marshall(body) as { [k: string]: AttributeValue }
        }
      }
    ])

    await dynamodb()(async (event) => {
      expect(event.dynamodb.NewImage).toStrictEqual(body)
      expect(event.dynamodb.OldImage).toStrictEqual(body)
    })(testEvent, createContext())

    expect.hasAssertions()
  })
})
