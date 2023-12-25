import express from 'express';
import { UserControllers } from './User.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './User.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.registerUser,
);

// router.post('/create', UserControllers.createUser);

// router.get('/', UserControllers.getAllUsers);
// router.get('/:id', UserControllers.getSingleUser);
// router.patch('/:id', UserControllers.updateUser);
// router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
