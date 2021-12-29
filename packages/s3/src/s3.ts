import { S3Event, Context } from 'aws-lambda'
import { compose } from '@lambda-func/core'
import { recordIterator } from '@lambda-func/record-iterator'

export const s3 = () => compose(recordIterator<S3Event, Context, void>())
