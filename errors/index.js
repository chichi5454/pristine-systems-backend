class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message = 'Authentication Invalid') {
    super(message);
    this.statusCode = 401;
  }
}

class UnauthorizedError extends CustomAPIError {
  constructor(message = 'Not authorized to access this route') {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message = 'Resource not found') {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends CustomAPIError {
  constructor(message = 'Resource already exists') {
    super(message);
    this.statusCode = 409;
  }
}

class ValidationError extends CustomAPIError {
  constructor(errors, message = 'Validation Error') {
    super(message);
    this.statusCode = 422;
    this.errors = errors;
  }
}

class RateLimitError extends CustomAPIError {
  constructor(message = 'Too many requests, please try again later') {
    super(message);
    this.statusCode = 429;
  }
}

class InternalServerError extends CustomAPIError {
  constructor(message = 'Something went wrong, please try again later') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  ValidationError,
  RateLimitError,
  InternalServerError,
};
