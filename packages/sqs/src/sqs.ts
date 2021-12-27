import { SQSEvent, Context } from 'aws-lambda'
import { compose } from '@cg-lambda/core'
import { recordIterator } from '@cg-lambda/record-iterator'
import { bodyToJson } from '@cg-lambda/body-to-json'

export const sqs = () => compose(recordIterator<SQSEvent, Context, void>(), bodyToJson())
