import asyncHandler from 'express-async-handler';
import User from '../Models/UserModels.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/Auth.js';
//registerUser

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExits = await User.findOne({ email });
    // check if user is already
    if (userExits) {
      res.status(400);
      throw new Error('User already exists');
    }
    // create new user
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // create new user in mongoDB
    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
      image,
    });

    // if create user sucessfully, send user token to client
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error: ' + error.message });
  }
});

// update the profileUser
const updateProfileUser = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error(' Caanot delete admin user');
      }
      await user.remove();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashPassword;
      await user.save();
      res.json({ message: 'Password changed' });
    } else {
      res.status(401);
      throw new Error('Invalid old password');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getLikedMoview = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedMovies');
    if (user) {
      res.json(user.likedMovies);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addLikeMovies = asyncHandler(async (req, res) => {
  const { movieId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (user) {
      // const isMovieLiked = user.likedMovies.find((movie) => movie.toString() === movieId)
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error('Movie already liked');
      }
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    } else {
      res.status(404);
      throw new Error('Movie not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
const deleteLikeMovie = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN CONTROLLER
const getAllUsersAdmin = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteUserAdmin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error(' Caanot delete admin user');
      }
      await user.remove();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateProfileUser,
  deleteUser,
  changePassword,
  getLikedMoview,
  deleteLikeMovie,
  addLikeMovies,
  getAllUsersAdmin,
  deleteUserAdmin,
};
