import { createContext } from '@lambda-func/core'

import { sqsRecordIterator } from './record-iterator'
import { createSQSEvent } from './testing'

describe('sqs', () => {
  it('returns the messageId of any failed messages', async () => {
    const testEvent = createSQSEvent([{ messageId: '1' }, { messageId: '2' }, { messageId: '3' }])
    const mockFunction = jest.fn()

    const result = await sqsRecordIterator()(async (record) => {
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
      await sqsRecordIterator({ reportBatchItemFailure: false })(async (record) => {
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
})
