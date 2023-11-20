import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as User from './Reducers/userReducer';
import * as categories from './Reducers/categoriesReducer';
import * as movies from './Reducers/MoviesReducer';

const rootReducer = combineReducers({
  //add your reducers here
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoritesMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoritesMovieReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,
  // categories reducers
  categoryGetAll: categories.getAllCategoriesReducer,
  categoryCreate: categories.createCategoryReducer,
  categoryUpdate: categories.updateCategoryReducer,
  categoryDelete: categories.deleteCategoryReducer,

  // movie reducer
  getAllMovies: movies.moviesListReducer,
  getRandomMovies: movies.moviesRandomReducer,
  getMovieById: movies.movieDetailReducer,
  getTopRatedMovie: movies.movieTopRatedReducer,
  createReview: movies.createReviewReducer,
  createMovies: movies.createMovieReducer,
  casts: movies.CastReducer,
  updateMovie: movies.updateMovieReducer,
  deleteMovie: movies.deleteMovieReducer,
  deleteAllMovies: movies.deleteAllMoviesReducer,
});
// get userinFo from localStorage
const userInFoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInFoFromStorage } };
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
