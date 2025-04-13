import { HttpStatus } from '@nestjs/common';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  constructor(message = 'Bad request', data?: any) {
    super(message, HttpStatus.BAD_REQUEST, data);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized', data?: any) {
    super(message, HttpStatus.UNAUTHORIZED, data);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found', data?: any) {
    super(message, HttpStatus.NOT_FOUND, data);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden', data?: any) {
    super(message, HttpStatus.FORBIDDEN, data);
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation failed', data?: any) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, data);
  }
}

export class InternalError extends CustomError {
  constructor(message = 'Internal Server Error', data?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, data);
  }
}
