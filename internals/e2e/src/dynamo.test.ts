import { DynamoDB } from 'aws-sdk'
import { DynamoDBStreamEvent } from 'aws-lambda'
import { compose, Controller, createContext } from '@cg-lambda/core'
import { dynamodb } from '@cg-lambda/dynamodb'
import { select } from '@cg-lambda/select'
import { zodParser } from '@cg-lambda/zod'
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

    const wrapper = compose(
      dynamodb(),
      select((event) => event.dynamodb.NewImage),
      zodParser(Request)
    )

    const controller: Controller<typeof wrapper> = async (event) => {
      expect(event).toStrictEqual(body)
    }

    await wrapper(controller)(
      <DynamoDBStreamEvent>{
        Records: [
          {
            dynamodb: {
              NewImage: DynamoDB.Converter.marshall(body)
            }
          }
        ]
      },
      createContext()
    )

    expect.hasAssertions()
  })
})
