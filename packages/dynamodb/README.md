# `@lambda-func/dynamodb`

This package contains a set of utilities for when working with DynamoDB stream handlers.

## Usage

```typescript
import { dynamodb } from '@lambda-func/dynamodb'

export const handler = dynamodb()(async (event) => {
  // iterates through each stream record
  console.log(event.dynamodb.NewImage)
})
```

### Testing

This package also includes some testing utilities to make input mapping easier.

- `createUnmarshalledDynamoDBRecord()` - mock the input event for the middleware stack

#### Other Options

- `createDynamoDBStreamEvent()` - for raw event mocking
- `createDynamoDBRecord()` - after record iteration
