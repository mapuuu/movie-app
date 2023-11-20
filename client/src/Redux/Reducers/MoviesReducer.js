import * as moviesContants from '../Constants/MoviesContants';

// get all movies
export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesContants.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case moviesContants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case moviesContants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// get random movie
export const moviesRandomReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesContants.MOVIES_RANDOM_REQUEST:
      return { isLoading: true };
    case moviesContants.MOVIES_RANDOM_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case moviesContants.MOVIES_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

//get movie by id

export const movieDetailReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case moviesContants.MOVIES_DETAILS_REQUEST:
      return { isLoading: true };
    case moviesContants.MOVIES_DETAILS_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case moviesContants.MOVIES_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesContants.MOVIES_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// get top rated movie

export const movieTopRatedReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesContants.MOVIE_TOP_RATED_REQUEST:
      return { isLoading: true };
    case moviesContants.MOVIE_TOP_RATED_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case moviesContants.MOVIE_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// craete review
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesContants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case moviesContants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesContants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesContants.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// CREATE MOVIE
export const createMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesContants.CREATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesContants.CREATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesContants.CREATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesContants.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
// CASTS
export const CastReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case moviesContants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case moviesContants.EDIT_CAST:
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return { casts: updatedCasts };
    case moviesContants.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case moviesContants.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};

// update movie
export const updateMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesContants.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesContants.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesContants.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesContants.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// delete movie

export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesContants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesContants.DELETE_MOVIE_SUCESS:
      return { isLoading: false, isSuccess: true };
    case moviesContants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesContants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case moviesContants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesContants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
