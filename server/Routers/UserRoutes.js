import express from 'express';
import {
  addLikeMovies,
  changePassword,
  deleteLikeMovie,
  deleteUser,
  deleteUserAdmin,
  getAllUsersAdmin,
  getLikedMoview,
  loginUser,
  registerUser,
  updateProfileUser,
} from '../Controller/UserController.js';
import { protect, admin } from '../middleware/Auth.js';

const router = express.Router();
router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/', protect, updateProfileUser);
router.delete('/', protect, deleteUser);
router.put('/changepass', protect, changePassword);
router.get('/favorites', protect, getLikedMoview);
router.post('/favorites', protect, addLikeMovies);
router.delete('/favorites', protect, deleteLikeMovie);

// ADMIN
router.get('/getalluser', protect, admin, getAllUsersAdmin);
router.delete('/:id', protect, admin, deleteUserAdmin);
export default router;
