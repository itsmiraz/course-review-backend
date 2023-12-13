import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const regex: RegExp = /([0-9a-fA-F]{24})|"(\d+)"/;
  const invalidValue: RegExpMatchArray | null = err.message.match(regex);

  let value = 'Value';

  if (invalidValue) {
    if (invalidValue[1]) {
      value = invalidValue[1];
    } else if (invalidValue[2]) {
      value = invalidValue[2];
    }
  }

  const errorMessage = `${value} is not a valid ID!`;
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
