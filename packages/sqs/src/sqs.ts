import { SQSEvent, Context } from 'aws-lambda'

import { compose } from '@lambda-func/core'
import { bodyToJson, BodyToJsonParameters } from '@lambda-func/body-to-json'

import { sqsRecordIterator, SQSRecordIteratorParameters } from './record-iterator'

export type SQSParameters = {
  recordIterator?: SQSRecordIteratorParameters
  parser?: BodyToJsonParameters
}

export const sqs = (params: SQSParameters = {}) =>
  compose(sqsRecordIterator<SQSEvent, Context>(params.recordIterator), bodyToJson(params.parser))
