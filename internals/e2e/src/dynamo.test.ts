import { DynamoDB } from 'aws-sdk'
import { DynamoDBStreamEvent } from 'aws-lambda'
import { compose, Controller, createContext } from '@lambda-func/core'
import { dynamodb } from '@lambda-func/dynamodb'
import { select } from '@lambda-func/select'
import { zodParser } from '@lambda-func/zod'
import { z } from 'zod'

describe('example', () => {
  it('composes function together', async () => {
    const Request = z.object({
      test: z.string(),
      nested: z.object({
        string: z.string()
      })
    })

    type Request = z.infer<typeof Request>

    const body: Request = {
      test: 'body',
      nested: {
        string: ''
      }
    }

    const testEvent = <DynamoDBStreamEvent>{
      Records: [
        {
          dynamodb: {
            NewImage: DynamoDB.Converter.marshall(body)
          }
        }
      ]
    }

    const wrapper = compose(
      dynamodb(),
      select((event) => event.dynamodb.NewImage),
      zodParser(Request)
    )

    const controller: Controller<typeof wrapper> = async (event) => {
      expect(event).toStrictEqual(body)
    }

    await wrapper(controller)(testEvent, createContext())

    expect.hasAssertions()
  })
})
