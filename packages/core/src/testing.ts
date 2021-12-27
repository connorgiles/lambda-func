import { Context } from 'aws-lambda'

export const createContext = (partial?: Partial<Context>): Context => ({
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: true,
  functionName: '',
  functionVersion: '',
  getRemainingTimeInMillis: () => 100,
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '',
  done: () => undefined,
  fail: () => undefined,
  succeed: () => undefined,
  ...partial
})
