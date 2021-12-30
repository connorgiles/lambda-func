import { SSM } from 'aws-sdk'
import { ssm } from './ssm'

describe('ssm', () => {
  it('resolves SSM parameters and injects to context', async () => {
    const mockSSM = {
      getParameter: jest.fn((request) => ({
        promise: () => Promise.resolve({ Parameter: { Value: request.Name + '-value' } })
      })) as unknown as SSM['getParameter']
    }

    await ssm(
      {
        test: 'testing',
        another: { name: 'one-more', decrypt: true }
      },
      { ssm: mockSSM }
    )(async (_, context) => {
      expect(context.ssm).toStrictEqual({
        test: 'testing-value',
        another: 'one-more-value'
      })
    })({}, {})

    expect.hasAssertions()
  })

  it('uses cached value if available', async () => {
    const mockSSM = {
      getParameter: jest.fn((request) => ({
        promise: () => Promise.resolve({ Parameter: { Value: request.Name + '-value' } })
      })) as unknown as SSM['getParameter']
    }

    const mockCache = {
      get: jest.fn().mockReturnValue('test'),
      set: jest.fn()
    }

    await ssm(
      { test: 'testing' },
      { ssm: mockSSM, cache: mockCache }
    )(async (_, context) => {
      expect(context.ssm).toStrictEqual({ test: 'test' })
    })({}, {})

    expect.hasAssertions()
  })

  it('throws an error if param is undefined', async () => {
    const mockSSM = {
      getParameter: jest.fn(() => ({
        promise: () => Promise.resolve({ Parameter: { Value: undefined } })
      })) as unknown as SSM['getParameter']
    }

    try {
      await ssm(
        { test: 'testing' },
        { ssm: mockSSM }
      )(async () => {
        /* do nothing*/
      })({}, {})
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }

    expect.hasAssertions()
  })
})
