import React, { useEffect } from 'react';
import Table from '../../Components/Home/Table';
import { Movies } from '../../Data/DataMovies';
import SlideBar from './SlideBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavoritesMoviesAction,
  getMovieFavoritesAction,
} from '../../Redux/Actions/userActions';
import { toast } from 'react-hot-toast';
import { USER_GET_FAVORITE_MOVIES_RESET } from '../../Redux/Constants/userContants';
import Loader from '../../Components/Notfications/Loader';
import { Empty } from '../../Components/Notfications/Empty';
const FavoritesMovie = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  //delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);
  // delete movie handler
  const deleteMovieHandler = () => {
    window.confirm('Are you sure you want to delete') &&
      dispatch(deleteFavoritesMoviesAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getMovieFavoritesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? 'USER_GET_FAVORITE_MOVIES_RESET'
          : 'USER_DELETE_FAVORITE_MOVIES_RESET',
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SlideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold ">Favorites Movie</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMovieHandler}
              className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded "
            >
              {deleteLoading ? 'Deleting...' : 'Delete All'}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <Empty message="Not found movies" />
        )}
      </div>
    </SlideBar>
  );
};

export default FavoritesMovie;
