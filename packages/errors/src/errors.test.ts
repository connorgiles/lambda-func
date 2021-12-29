import * as err from './errors'

describe('isHandlerError', () => {
  it('returns true for any error object with a statusCode property', () => {
    const foo = new err.HandlerError('Testing')
    expect(err.isHandlerError(foo)).toBe(true)
  })

  it('returns false for other error objects', () => {
    const foo = new Error('Testing')
    expect(err.isHandlerError(foo)).toBe(false)
  })
})

describe('isClientError', () => {
  it('returns true for any error code between 400 and 499 inclusive', () => {
    const foo = new err.NotFound('Testing')
    expect(err.isClientError(foo)).toBe(true)
  })

  it('returns false for other codes', () => {
    const foo = new err.InternalServerError('Testing')
    expect(err.isClientError(foo)).toBe(false)
  })
})

describe('isServerError', () => {
  it('returns true for any error code between 500 and 599 inclusive', () => {
    const foo = new err.InternalServerError('Testing')
    expect(err.isServerError(foo)).toBe(true)
  })

  it('returns false for other codes', () => {
    const foo = new err.NotFound('Testing')
    expect(err.isServerError(foo)).toBe(false)
  })
})

describe('HTTP Exceptions', () => {
  describe.each([
    err.BadRequest,
    err.Unauthorized,
    err.PaymentRequired,
    err.Forbidden,
    err.NotFound,
    err.MethodNotAllowed,
    err.NotAcceptable,
    err.ProxyAuthenticationRequired,
    err.RequestTimeout,
    err.Conflict,
    err.Gone,
    err.LengthRequired,
    err.PreconditionFailed,
    err.PayloadTooLarge,
    err.UriTooLong,
    err.UnsupportedMediaType,
    err.RangeNotSatisfiable,
    err.ExpectationFailed,
    err.MisdirectedRequest,
    err.UnprocessableEntity,
    err.Locked,
    err.FailedDependency,
    err.TooEarly,
    err.UpgradeRequired,
    err.PreconditionRequired,
    err.TooManyRequests,
    err.RequestHeaderFieldsTooLarge,
    err.UnavailableForLegalReasons,
    err.InternalServerError,
    err.NotImplemented,
    err.BadGateway,
    err.ServiceUnavailable,
    err.GatewayTimeout,
    err.HttpVersionNotSupported,
    err.VariantAlsoNegotiates,
    err.UnsufficientStorage,
    err.LoopDetected,
    err.NotExtended,
    err.NetworkAuthenticationRequired
  ])('%p', (ErrorClass) => {
    const obj = new ErrorClass('Detail')

    it('should be instantiatable', () => {
      expect(typeof obj.title).toBe('string')
      expect(obj.detail).toBe('Detail')
      expect(obj.message).toBe(obj.detail)
    })

    it('returns true to type guards', () => {
      expect(err.isHandlerError(obj)).toBe(true)
    })

    it('serializes to client consumable JSON', () => {
      expect(JSON.stringify(obj)).toBe(
        JSON.stringify({
          statusCode: obj.statusCode,
          error: obj.title,
          message: obj.detail
        })
      )
    })

    it('properly compares instances with instanceof', () => {
      expect(new Error()).not.toBeInstanceOf(ErrorClass)
      expect(new err.HandlerError()).not.toBeInstanceOf(ErrorClass)
      expect(obj).toBeInstanceOf(ErrorClass)
    })
  })
})
