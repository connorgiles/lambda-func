# Lambda Middleware

This monorepo contains the a set of higher order functions and utilities to create composable middleware for lambda functions.

## Usage

```typescript
import { z } from 'zod'
import { compose, Controller } from '@lambda-func/core'
import { sqs } from '@lambda-func/sqs'
import { inject } from '@lambda-func/inject'
import { select } from '@lambda-func/select'
import { zodParser } from '@lambda-func/zod'

import { Database, Logger } from '../services'

const wrapper = compose(
  sqs(),
  select((record) => record.body),
  zodParser(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ),
  inject('db', Database),
  inject('logger', Logger)
)

// easily testable controller
export const controller: Controller<typeof wrapper> = async (record, { logger, db }) => {
  logger.info('Saving record to database')
  await db.save(record)
}

export const handler = wrapper(controller)
```

## Rush

This repo uses [rush](https://rushjs.io/) to maintain a monorepo of packages. [Learn the basics 👉](https://rushjs.io/pages/developer/new_developer/)

### Installation

```
npm i -g @microsoft/rush
```

### Useful Commands

- `rush build` - build pacakges that need it
- `rush test` - test all packages
- `rush rebuild` - builds all packages
- `rush publish` - publish all packages
- `rush purge` - to clean up temporary files created by rush

### Installing Dependencies

With rush, you often will work from the directory of the individual "project" (package) you are working on. If you want to add a dependency to to that project then you run `rush add --package example-package (--dev)`.
