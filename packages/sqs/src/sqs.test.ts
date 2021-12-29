import { Context } from 'aws-lambda'
import { createContext, Controller } from '@lambda-func/core'

import { createParsedSQSRecord, createSQSEvent } from './testing'
import { ParsedSQSRecord } from './types'
import { sqs } from './sqs'

describe('sqs', () => {
  it('iterates over each record in Records', async () => {
    const body = { test: 'string' }
    const testEvent = createSQSEvent([{ body: JSON.stringify(body) }])

    await sqs()(async (record) => {
      expect(record.body).toStrictEqual(body)
    })(testEvent, createContext())

    expect.hasAssertions()
  })

  it('returns the messageId of any failed messages', async () => {
    const testEvent = createSQSEvent([{ messageId: '1' }, { messageId: '2' }, { messageId: '3' }])
    const mockFunction = jest.fn()

    const result = await sqs()(async (record) => {
      if (record.messageId === '2') {
        throw new Error()
      }

      mockFunction(record.messageId)
    })(testEvent, createContext())

    expect(mockFunction).toBeCalledWith('1')
    expect(mockFunction).toBeCalledWith('3')
    expect(result).toStrictEqual({
      batchItemFailures: [
        {
          itemIdentifier: '2'
        }
      ]
    })
  })

  it('throws errors if reportBatchItemFailure is false', async () => {
    const testEvent = createSQSEvent([{ messageId: '1' }, { messageId: '2' }, { messageId: '3' }])
    const mockFunction = jest.fn()

    try {
      await sqs({ recordIterator: { reportBatchItemFailure: false } })(async (record) => {
        if (record.messageId === '2') {
          throw new Error()
        }

        mockFunction(record.messageId)
      })(testEvent, createContext())
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }

    expect.hasAssertions()
    expect(mockFunction).toBeCalledWith('1')
    expect(mockFunction).not.toBeCalledWith('3')
  })

  it('requires controller with parsed SQS record input', async () => {
    const body = { test: 'string' }

    const testRecord = createParsedSQSRecord({ body })
    const testContext = createContext()

    const wrapper = sqs()

    const controller: Controller<typeof wrapper> = async (
      record: ParsedSQSRecord<unknown>,
      context: Context
    ) => {
      expect(record.body).toStrictEqual(body)
      expect(context).toStrictEqual(testContext)
    }

    await controller(testRecord, testContext)

    expect.hasAssertions()
  })
})
