import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  // const errorSources: TErrorSource = Object.values(err.errors).map(
  //   (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
  //     return {
  //       path: value?.path,
  //       message: value?.message,
  //     };
  //   },
  // );
  console.log(err.errors);

  const errorMessage = '';

  const statusCode = 400;
  return {
    statusCode,
    errorMessage,
    errorDetails: {},
    message: 'Validation Error',
  };
};

export default handleValidationError;
