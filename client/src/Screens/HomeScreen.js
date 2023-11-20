import React, { useEffect } from 'react';
import Banner from '../Components/Home/Banner';
import PopularMovie from '../Components/Home/PopularMovie';
import Promos from '../Components/Home/Promos';
import TopRate from '../Components/Home/TopRate';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from '../Redux/Actions/MoviesActions';
import { toast } from 'react-hot-toast';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  useEffect(() => {
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get top rated movies
    dispatch(getTopRatedMovieAction());
    //errors
    if (isError || randomError || topError) {
      toast.error('Something went wrong');
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovie movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRate movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
};

export default HomeScreen;
