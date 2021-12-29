# `@lambda-func/s3`

This package contains a set of utilities for when working with S3 event handlers.

## Usage

```typescript
import { s3 } from '@lambda-func/s3'

export const handler = s3()(async (event) => {
  // iterates through each event record
  console.log(event.s3.bucket.name)
})
```

### Testing

This package also includes some testing utilities to make input mapping easier.

- `createS3Record()` - mock the input event for the middleware stack
- `createS3Event()` - mock the raw event
