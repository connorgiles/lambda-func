import { SNSEvent, Context } from 'aws-lambda'
import { compose } from '@lambda-func/core'
import { recordIterator } from '@lambda-func/record-iterator'
import { parseSNSMessage } from './parser'

export const sns = () => compose(recordIterator<SNSEvent, Context, void>(), parseSNSMessage())
