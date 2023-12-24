import express from 'express';
import { UserControllers } from './User.controller';

const router = express.Router();

router.post('/create', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
