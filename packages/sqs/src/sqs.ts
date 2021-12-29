import { SQSEvent, Context } from 'aws-lambda'
import { compose } from '@lambda-func/core'
import { recordIterator } from '@lambda-func/record-iterator'
import { bodyToJson } from '@lambda-func/body-to-json'

export const sqs = () => compose(recordIterator<SQSEvent, Context, void>(), bodyToJson())
