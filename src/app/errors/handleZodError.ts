import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interfaces/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const issuesMessage = err.issues.map((issue) => issue.message);
  const errorMessage = issuesMessage.join('. ');
  console.log(errorMessage);
  const statusCode = 400;

  const ErrorDetails = {
    issues: err.issues,
  };
  return {
    statusCode,
    errorMessage: errorMessage,
    message: 'Validation Error',
    errorDetails: ErrorDetails,
  };
};

export default handleZodError;
