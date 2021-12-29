export class HandlerError extends Error {
  statusCode = 500
  title = 'Internal Server Error'

  detail?: string

  constructor(detail?: string) {
    super(detail || 'HTTP error')
    this.detail = detail
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.title,
      message: this.detail
    }
  }
}

export const isHandlerError = (error: Error): error is HandlerError =>
  Number.isInteger((<HandlerError>error).statusCode) && typeof (<HandlerError>error).title === 'string'

export const isClientError = (e: Error): boolean =>
  isHandlerError(e) && e.statusCode >= 400 && e.statusCode <= 499

export const isServerError = (e: Error): boolean =>
  isHandlerError(e) && e.statusCode >= 500 && e.statusCode <= 599

export class BadRequest extends HandlerError {
  statusCode = 400
  title = 'Bad Request'
}

export class Unauthorized extends HandlerError {
  statusCode = 401
  title = 'Unauthorized'
}

export class PaymentRequired extends HandlerError {
  statusCode = 402
  title = 'Payment Required'
}

export class Forbidden extends HandlerError {
  statusCode = 403
  title = 'Forbiddden'
}

export class NotFound extends HandlerError {
  statusCode = 404
  title = 'Not Found'
}

export class MethodNotAllowed extends HandlerError {
  statusCode = 405
  title = 'Method Not Allowed'
}

export class NotAcceptable extends HandlerError {
  statusCode = 406
  title = 'Not Acceptable'
}

export class ProxyAuthenticationRequired extends HandlerError {
  statusCode = 407
  title = 'Proxy Authentication Required'
}

export class RequestTimeout extends HandlerError {
  statusCode = 408
  title = 'Request Timeout'
}

export class Conflict extends HandlerError {
  statusCode = 409
  title = 'Conflict'
}

export class Gone extends HandlerError {
  statusCode = 410
  title = 'Gone'
}

export class LengthRequired extends HandlerError {
  statusCode = 411
  title = 'LengthRequired'
}

export class PreconditionFailed extends HandlerError {
  statusCode = 412
  title = 'PreconditionFailed'
}

export class PayloadTooLarge extends HandlerError {
  statusCode = 413
  title = 'Payload Too Large'
}

export class UriTooLong extends HandlerError {
  statusCode = 414
  title = 'URI Too Long'
}

export class UnsupportedMediaType extends HandlerError {
  statusCode = 415
  title = 'Unsupported Media Type'
}

export class RangeNotSatisfiable extends HandlerError {
  statusCode = 416
  title = 'Range Not Satisfiable'
}

export class ExpectationFailed extends HandlerError {
  statusCode = 417
  title = 'Expectation Failed'
}

export class MisdirectedRequest extends HandlerError {
  statusCode = 421
  title = 'Misdirected Request'
}

export class UnprocessableEntity extends HandlerError {
  statusCode = 422
  title = 'Unprocessable Entity'
}

export class Locked extends HandlerError {
  statusCode = 423
  title = 'Locked'
}

export class FailedDependency extends HandlerError {
  statusCode = 424
  title = 'Failed Dependency'
}

export class TooEarly extends HandlerError {
  statusCode = 425
  title = 'Too Early'
}

export class UpgradeRequired extends HandlerError {
  statusCode = 426
  title = 'Upgrade Required'
}

export class PreconditionRequired extends HandlerError {
  statusCode = 428
  title = 'Precondition Required'
}

export class TooManyRequests extends HandlerError {
  statusCode = 429
  title = 'Too Many Requests'
}

export class RequestHeaderFieldsTooLarge extends HandlerError {
  statusCode = 431
  title = 'Request Header Fields Too Large'
}

export class UnavailableForLegalReasons extends HandlerError {
  statusCode = 451
  title = 'Unavailable For Legal Reasons'
}

export class InternalServerError extends HandlerError {
  statusCode = 500
  title = 'Internal Server Error'
}

export class NotImplemented extends HandlerError {
  statusCode = 501
  title = 'Not Implemented'
}

export class BadGateway extends HandlerError {
  statusCode = 502
  title = 'Bad Gateway'
}

export class ServiceUnavailable extends HandlerError {
  statusCode = 503
  title = 'Service Unavailable'
}

export class GatewayTimeout extends HandlerError {
  statusCode = 504
  title = 'Gateway Timeout'
}

export class HttpVersionNotSupported extends HandlerError {
  statusCode = 505
  title = 'HTTP Version Not Supported'
}

export class VariantAlsoNegotiates extends HandlerError {
  statusCode = 506
  title = 'Variant Also Negotiates'
}

export class UnsufficientStorage extends HandlerError {
  statusCode = 507
  title = 'Unsufficient Storage'
}

export class LoopDetected extends HandlerError {
  statusCode = 508
  title = 'Loop Detected'
}

export class NotExtended extends HandlerError {
  statusCode = 510
  title = 'Not Extended'
}

export class NetworkAuthenticationRequired extends HandlerError {
  statusCode = 511
  title = 'Network Authentication Required'
}
