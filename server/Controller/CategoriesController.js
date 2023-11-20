import asyncHandler from 'express-async-handler';
import Categories from '../Models/CategoriesModel.js';

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ADMIN CONTROLLER

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const category = new Categories({ title });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const updatedCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      category.title = req.body.title || category.title;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'category not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const deletedCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(400).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updatedCategory, deletedCategory };
