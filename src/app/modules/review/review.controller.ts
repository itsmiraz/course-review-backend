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

const getAllcategoriess = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDb();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllcategoriess,
};
