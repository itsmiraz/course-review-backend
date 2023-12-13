import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const regex: RegExp = /"(\d+)"/;
  const value: RegExpMatchArray | null = err.message.match(regex);

  const errorMessage = `${value ? value[1] : 'Value'} is not a valid ID!`;

  const errorDetails = {
    issues: err.errors,
  };

  const statusCode = 400;
  return {
    statusCode,
    errorMessage,
    errorDetails: errorDetails,
    message: 'Invalid ID',
  };
};

export default handleValidationError;
