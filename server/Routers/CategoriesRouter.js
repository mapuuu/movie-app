import express from 'express';
import {
  createCategory,
  deletedCategory,
  getCategories,
  updatedCategory,
} from '../Controller/CategoriesController.js';
import { protect, admin } from '../middleware/Auth.js';

const router = express.Router();
router.get('/', getCategories);

// admin router
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updatedCategory);
router.delete('/:id', protect, admin, deletedCategory);

export default router;
