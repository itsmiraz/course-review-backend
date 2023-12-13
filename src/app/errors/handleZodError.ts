import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interfaces/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
  //   return {
  //     path: issue?.path[issue.path.length - 1],
  //     message: issue.message,
  //   };
  // });

  const issuesMessage = err.issues.map((issue) => issue.message);
  const errorMessage = issuesMessage.join('. ');

  // console.log(err.issues[0].message);
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
