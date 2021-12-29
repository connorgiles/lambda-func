import { S3Event, Context } from 'aws-lambda'
import { compose } from '@cg-lambda/core'
import { recordIterator } from '@cg-lambda/record-iterator'

export const s3 = () => compose(recordIterator<S3Event, Context, void>())
