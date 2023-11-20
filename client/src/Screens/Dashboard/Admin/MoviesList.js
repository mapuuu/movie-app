import React, { useEffect } from 'react';
import Table from '../../../Components/Home/Table';
import { Movies } from '../../../Data/DataMovies';
import SlideBar from '../SlideBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from '../../../Redux/Actions/MoviesActions';
import { toast } from 'react-hot-toast';
import Loader from '../../../Components/Notfications/Loader';
import { Empty } from '../../../Components/Notfications/Empty';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';

const MoviesList = () => {
  const dispatch = useDispatch();
  const sameClass =
    'text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:border-subMain ';

  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  // delete all movies
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );
  // delete handler
  const deleteMovieHandler = (id) => {
    window.confirm('Are you sure you want to delete movie') &&
      dispatch(deleteMovieAction(id));
  };

  const deleteAllMoviesHandler = () => {
    window.confirm('Are you sure you want to delete all movies') &&
      dispatch(deleteAllMoviesAction());
  };

  useEffect(() => {
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
    dispatch(getAllMoviesAction({}));
  }, [dispatch, isError, deleteError, allError]);

  const nextpage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevpage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };
  return (
    <SlideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold ">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded "
            >
              {allLoading ? 'Delete ...' : 'Delete All'}
            </button>
          )}
        </div>

        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            <div className="w-full flex-rows gap-6  my-15">
              <button
                onClick={prevpage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextpage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="Not found movies" />
        )}
      </div>
    </SlideBar>
  );
};

export default MoviesList;
