# `@lambda-func/body-to-json`

This package includes a `lambda-func` middleware to parse the JSON in the `body` of an incoming event.

## Usage

```typescript
import { APIGatewayProxyEvent } from 'aws-lambda'
import { bodyToJson } from '@lambda-func/body-to-json'

type User = { email: string }
const isUser = (value: unknown): value is User => typeof (<User>value).email === 'string'

export const handler = bodyToJson<APIGatewayProxyEvent>()(async (event) => {
  if (isUser(event.body)) {
    // do something
  }
})
```
