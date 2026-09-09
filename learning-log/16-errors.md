Error Handler
   │
   ├── ValidationError → 400 + field errors
   │
   ├── AppError
   │      ├── NotFoundError → 404
   │      ├── UnauthorizedError → 401
   │      ├── ForbiddenError → 403
   │      └── ConflictError → 409
   │
   └── Unknown error → 500

1. PaymentRequiredError

The complete class definition is:

export class PaymentRequiredError extends AppError {
  constructor(message = 'Payment required') {
    super(402, 'PAYMENT_REQUIRED', message);
  }
}

The only file that needs to be changed is:

src/shared/errors.ts

The central error handler already knows how to handle AppError, so no change is needed there.

