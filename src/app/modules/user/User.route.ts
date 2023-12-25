import express from 'express';
import { UserControllers } from './User.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './User.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.registerUserValidationSchema),
  UserControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidationSchema),
  UserControllers.loginUser,
);
router.post(
  '/change-password',
  auth('user', 'admin'),
  validateRequest(UserValidations.changePasswordValidationSchema),
  UserControllers.changePassword,
);

// router.post('/create', UserControllers.createUser);

// router.get('/', UserControllers.getAllUsers);
// router.get('/:id', UserControllers.getSingleUser);
// router.patch('/:id', UserControllers.updateUser);
// router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
