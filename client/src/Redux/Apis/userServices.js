import Axios from './Axios';

// register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post('/users', user);
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};
// logout user Funtion
const logoutService = () => {
  localStorage.removeItem('userInfo');
  return null;
};

//login user API call

const loginService = async (user) => {
  const { data } = await Axios.post('/users/login', user);
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

// update profile API call

const updateProfileService = async (user, token) => {
  const { data } = await Axios.put('/users', user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
};

//delete profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem('userInfo');
  }
  return data;
};

// change password api call
const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.put('/users/changepass', passwords, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// like movie APi user
const likeMoviesService = async (movieId, token) => {
  const { data } = await Axios.post(`/users/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all movie favorites
const getMovieFavoritesService = async (token) => {
  const { data } = await Axios.get('/users/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// delete all favorites movie
const deleteAllFavoritesMoviesServices = async (token) => {
  const { data } = await Axios.delete('/users/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
// get all user-ADMIN
const getAllUsersService = async (token) => {
  const { data } = await Axios.get('/users/getalluser', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// admin delete user
const DeleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getMovieFavoritesService,
  deleteAllFavoritesMoviesServices,
  getAllUsersService,
  DeleteUserService,
  likeMoviesService,
};
