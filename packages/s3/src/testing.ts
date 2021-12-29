import { S3EventRecord, S3Event } from 'aws-lambda'
import { DeepPartial } from '@cg-lambda/core'

export const createS3Record = (partial?: DeepPartial<S3EventRecord>): S3EventRecord => ({
  awsRegion: '',
  eventSource: '',
  eventName: '',
  eventTime: '',
  eventVersion: '',
  ...partial,
  requestParameters: { sourceIPAddress: '', ...partial?.requestParameters },
  responseElements: { 'x-amz-id-2': '', 'x-amz-request-id': '', ...partial?.responseElements },
  userIdentity: {
    principalId: '',
    ...partial?.userIdentity
  },
  s3: {
    configurationId: '',
    s3SchemaVersion: '',
    ...partial?.s3,
    bucket: {
      arn: '',
      name: '',
      ...partial?.s3?.bucket,
      ownerIdentity: {
        principalId: '',
        ...partial?.s3?.bucket?.ownerIdentity
      }
    },
    object: {
      eTag: '',
      sequencer: '',
      key: '',
      size: 0,
      ...partial?.s3?.object
    }
  },
  glacierEventData: {
    restoreEventData: {
      lifecycleRestorationExpiryTime: '',
      lifecycleRestoreStorageClass: '',
      ...partial?.glacierEventData?.restoreEventData
    }
  }
})

export const createS3Event = (
  partials: Array<DeepPartial<S3EventRecord> | undefined> = [undefined]
): S3Event => ({
  Records: partials.map(createS3Record)
})
