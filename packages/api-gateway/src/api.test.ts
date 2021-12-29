import { createContext } from '@lambda-func/core'
import { NotFound } from '@lambda-func/errors'
import { apiGateway } from './api'
import { createAPIGatewayEvent } from './testing'

describe('apiGateway', () => {
  it('maps response to HTTP response', async () => {
    const testEvent = { test: { nested: 'test' } } as const

    const result = await apiGateway()(async () => {
      return testEvent
    })(createAPIGatewayEvent(), createContext())

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify(testEvent),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('allows you to set the status code', async () => {
    const testEvent = { test: { nested: 'test' } } as const

    const result = await apiGateway({ response: { statusCode: 202 } })(async () => {
      return testEvent
    })(createAPIGatewayEvent(), createContext())

    expect(result).toStrictEqual({
      statusCode: 202,
      body: JSON.stringify(testEvent),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('catches and surfaces generic error on any error', async () => {
    const result = await apiGateway()(async () => {
      throw new Error('Test error')
    })(createAPIGatewayEvent(), createContext())

    expect(result).toStrictEqual({
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        error: 'Internal Server Error'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('catches and maps Handler errors', async () => {
    const result = await apiGateway()(async () => {
      throw new NotFound('Test error')
    })(createAPIGatewayEvent(), createContext())

    expect(result).toStrictEqual({
      statusCode: 404,
      body: JSON.stringify({
        statusCode: 404,
        error: 'Not Found',
        message: 'Test error'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})
