import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error('An unexpected server error occurred.');

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};
