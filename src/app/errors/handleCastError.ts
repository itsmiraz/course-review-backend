import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const objectIdPattern = /[0-9a-fA-F]{24}/;

  const id = err?.message.match(objectIdPattern);
  // const errorSources: TErrorSource = [
  //   {
  //     path: err?.path,
  //     message: err?.message,
  //   },
  // ];

  const errorMessage = `${id} is not a valid ID!`;

  return {
    statusCode: 400,

    errorMessage,
    message: 'Invalid Id',
    errorDetails: err,
  };
};
export default handleCastError;
