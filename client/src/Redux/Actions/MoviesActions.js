import * as moviesContants from '../Constants/MoviesContants';
import * as moviesAPI from '../Apis/MoviesService';
import { ErrorsAction, tokenProtection } from '../Protection.js';
import { toast } from 'react-hot-toast';

// get all movies action
export const getAllMoviesAction =
  ({
    category = '',
    time = '',
    language = '',
    rate = '',
    year = '',
    search = '',
    pageNumber = '',
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: moviesContants.MOVIES_LIST_REQUEST,
        });
        const response = await moviesAPI.getAllMoviesService(
          category,
          time,
          language,
          rate,
          year,
          search,
          pageNumber
        );
        dispatch({ type: moviesContants.MOVIES_LIST_SUCCESS, payload: response });
      } catch (error) {
        ErrorsAction(error, dispatch, moviesContants.MOVIES_LIST_FAIL);
      }
    };

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesContants.MOVIES_RANDOM_REQUEST });
    const response = await moviesAPI.getRandomMoviesService();
    dispatch({ type: moviesContants.MOVIES_RANDOM_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.MOVIES_RANDOM_FAIL);
  }
};

// get movie by id action
export const getMovieByMovieIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesContants.MOVIES_DETAILS_REQUEST });
    const response = await moviesAPI.getMovieByIdService(id);
    dispatch({
      type: moviesContants.MOVIES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.MOVIES_DETAILS_FAIL);
  }
};
//get top rated movies
export const getTopRatedMovieAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesContants.MOVIE_TOP_RATED_REQUEST });
    const response = await moviesAPI.getTopRatedMovieSrvice();
    dispatch({
      type: moviesContants.MOVIE_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.MOVIE_TOP_RATED_FAIL);
  }
};

//  review movie action

export const reviewMovieAction =
  ({ id, review }) =>
    async (dispatch, getState) => {
      try {
        dispatch({ type: moviesContants.CREATE_REVIEW_REQUEST });
        const response = await moviesAPI.reviewMovieService(
          tokenProtection(getState),
          id,
          review
        );
        dispatch({
          type: moviesContants.CREATE_REVIEW_SUCCESS,
          payload: response,
        });
        toast.success('Review add successfully');
        dispatch({ type: moviesContants.CREATE_REVIEW_RESET });
        dispatch(getMovieByMovieIdAction(id));
      } catch (error) {
        ErrorsAction(error, dispatch, moviesContants.CREATE_REVIEW_FAIL);
      }
    };

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.CREATE_MOVIE_REQUEST });
    const response = await moviesAPI.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: moviesContants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success('Movie created successfully');
    dispatch(deleteAllCastsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.CREATE_MOVIE_FAIL);
  }
};

/// CASTS

// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesContants.ADD_CAST, payload: cast });
  localStorage.setItem('cast', JSON.stringify(getState().casts.casts));
};
// remove cast

export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesContants.DELETE_CAST, payload: id });
  localStorage.setItem('casts', JSON.stringify(getState().casts.casts));
};
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesContants.EDIT_CAST, payload: cast });
  localStorage.setItem('casts', JSON.stringify(getState().casts.casts));
};

// delete all casts
export const deleteAllCastsAction = () => async (dispatch, getState) => {
  dispatch({ type: moviesContants.RESET_CAST });
  localStorage.removeItem('casts');
};

// update movie
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.UPDATE_MOVIE_REQUEST });
    const response = await moviesAPI.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: moviesContants.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success('Movie updated successfully');
    dispatch(getMovieByMovieIdAction(id));
    dispatch(deleteAllCastsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.UPDATE_MOVIE_FAIL);
  }
};

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesContants.DELETE_MOVIE_REQUEST });
    const response = await moviesAPI.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: moviesContants.DELETE_MOVIE_SUCESS,
      payload: response,
    });
    toast.success('Movie deleted successfully');
    dispatch(getAllMoviesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies

export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesAPI.deleteAllMoviesService });
    const response = await moviesAPI.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesContants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success('All movies deleted successfully');
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesContants.DELETE_ALL_MOVIES_FAIL);
  }
};
