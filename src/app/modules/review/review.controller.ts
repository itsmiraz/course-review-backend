import { catchAsync } from '../../utils/catchAsync';
import { ReviewServices } from './review.servicee';

const createReview = catchAsync(async (req, res) => {
  const createdBy = req.user._id;
  const result = await ReviewServices.createReviewIntoDB(createdBy, req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
