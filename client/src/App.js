import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Screens/AboutUs.js';
import ContactUs from './Screens/ContactUs.js';
import Profile from './Screens/Dashboard/Profile.js';
import HomeScreen from './Screens/HomeScreen.js';
import Login from './Screens/Login.js';
import MoviesPage from './Screens/Movies.js';
import NotFound from './Screens/NotFound.js';
import Register from './Screens/Register.js';
import SingleMovie from './Screens/SingleMovie.js';
import WatchMovie from './Screens/WatchMovie.js';
import Aos from 'aos';
import Password from './Screens/Dashboard/Password.js';
import FavoritesMovie from './Screens/Dashboard/FavoritesMovie.js';
import MoviesList from './Screens/Dashboard/Admin/MoviesList.js';
import DashBoard from './Screens/Dashboard/Admin/DashBoard.js';
import Categories from './Screens/Dashboard/Admin/Categories.js';
import User from './Screens/Dashboard/Admin/User.js';
import AddMovies from './Screens/Dashboard/Admin/AddMovie.js';
import ToastContainer from './Components/Notfications/Toast.js';
import { AdminProtectedRouer, ProtectedRouter } from './ProtectedRouter.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from './Redux/Actions/categoryAction.js';
import { getAllMoviesAction } from './Redux/Actions/MoviesActions.js';
import { getMovieFavoritesAction } from './Redux/Actions/userActions.js';
import { toast } from 'react-hot-toast';
import EditMovie from './Screens/Dashboard/Admin/EditMovie.js';
const App = () => {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if (userInfo) {
      dispatch(getMovieFavoritesAction());
    }
    if (isError || catError) {
      toast.error('Somethings went wrong ,please try again');
      dispatch({ type: 'LIKE_MOVIE_RESET' });
    }
    if (isSuccess) {
      dispatch({ type: 'LIKE_MOVIE_RESET' });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/movies/:search" element={<MoviesPage />}></Route>
        <Route path="/movie/:id" element={<SingleMovie />}></Route>
        <Route path="/watch/:id" element={<WatchMovie />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        {/* PRIVATE PUBLIC ROUTERS */}
        <Route element={<ProtectedRouter />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/password" element={<Password />}></Route>
          <Route path="/favorites" element={<FavoritesMovie />}></Route>
          <Route element={<AdminProtectedRouer />}>
            {/* ADMIN ROUTERS */}
            <Route path="/movieslist" element={<MoviesList />}></Route>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/users" element={<User />}></Route>
            <Route path="/addmovie" element={<AddMovies />}></Route>
            <Route path="/edit/:id" element={<EditMovie />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
