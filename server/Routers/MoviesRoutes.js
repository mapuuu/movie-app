import express from 'express';
import {
  createMovie,
  createMovieReview,
  deleteAllMovie,
  deleteMovie,
  getMovies,
  getMoviesById,
  getRandomMovies,
  getTopRatedMovies,
  importMovies,
  searchMovies,
  updateMovie,
} from '../Controller/MoviesController.js';
import { protect, admin } from '../middleware/Auth.js';

const router = express.Router();
router.post('/import', importMovies);
router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/:id', getMoviesById);
router.get('/rated/top', getTopRatedMovies);
router.get('/random/all', getRandomMovies);


//Private Routes
router.post('/:id/reviews', protect, createMovieReview);
// PRIVATE ROUTER ADMIN CONTROLLER
router.put('/:id/updateMovie', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);
router.delete('/', protect, admin, deleteAllMovie);
router.post('/', protect, admin, createMovie);

export default router;
