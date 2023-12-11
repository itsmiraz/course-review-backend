import AppError from '../../errors/AppError';

export const getDurationInWeeks = (
  startDate: string,
  endDate: string,
): number => {
  //Get the difference between between two dates
  const StartDate = new Date(startDate);
  const EndDate = new Date(endDate);

  // Some Validations for checking the date
  if (isNaN(StartDate.getTime())) {
    throw new AppError(400, ' Start Date is not Valid');
  }
  if (isNaN(EndDate.getTime())) {
    throw new AppError(400, ' End Date is not Valid');
  }
  if (EndDate.getTime() < StartDate.getTime()) {
    throw new AppError(
      400,
      'Your end date is not valid according to start date',
    );
  }

  const difference = EndDate.getTime() - StartDate.getTime();
  const totalDays = Math.round(difference / (1000 * 3600 * 24));

  // convert the difference into weeks

  const totalWeeks = Math.ceil(totalDays / 7);

  return totalWeeks;
};
