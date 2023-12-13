/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interfaces/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something Went Wrong';
  let errorMessage = 'Something Went Wrong';
  let errorDetails = {};

  // Checks the error is zod is not
  if (err instanceof ZodError) {
    const simplifierError = handleZodError(err);
    statusCode = simplifierError.statusCode;
    message = simplifierError.message;
    errorDetails = simplifierError.errorDetails;
    errorMessage = simplifierError.errorMessage;
  } else if (err?.name === 'ValidationError') {
    const simplifierError = handleValidationError(err);
    statusCode = simplifierError.statusCode;
    message = simplifierError.message;
    errorDetails = simplifierError.errorDetails;
    errorMessage = simplifierError.errorMessage;
  } else if (err?.name === 'CastError') {
    const simplifierError = handleCastError(err);
    statusCode = simplifierError.statusCode;
    message = simplifierError.message;
    // errorSource = simplifierError.errorSources;
    errorMessage = simplifierError.errorMessage;
    errorDetails = simplifierError.errorDetails;
  } else if (err?.code === 11000) {
    const simplifierError = handleDuplicateError(err);
    statusCode = simplifierError.statusCode;
    message = simplifierError.message;
    errorMessage = simplifierError.errorMessage;
    errorDetails = simplifierError.errorDetails;
    // errorSource = simplifierError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorDetails = err;
    errorMessage = err.message;
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = err;
  }
  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessage,
    errorDetails: errorDetails,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
