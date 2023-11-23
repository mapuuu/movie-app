import { MoviesData } from '../Data/MovieData.js';
import asyncHandler from 'express-async-handler';
import Movie from '../Models/MoviesModel.js';

const importMovies = asyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

//search
const searchMovies = asyncHandler(async (req, res) => {
  try {
    const { name } = req.query;
    const agg = [
      {
        $match: {
          name: {
            $regex: `^${name}`, // Tìm kiếm các tài liệu có tên chứa 'name'
            $options: 'i', // 'i' để không phân biệt chữ hoa/chữ thường
          },
        },
      },
      {
        $sort: {
          numberOfRevies: -1,
          rate: -1,
          // Sắp xếp theo trường price giảm dần (từ cao đến thấp)
        },
      },
      {
        $limit: 6,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          numberOfRevies: 1,
          rate: 1,
          titleImage: 1,
        },
      },
    ];

    const response = await Movie.aggregate(agg);

    // console.log(response);
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.json();
  }
});

const getMovies = asyncHandler(async (req, res) => {
  try {
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: 'i' } }),
    };
    // load more movies
    const page = Number(req.query.pageNumber) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    //find movies by query, skip and limit

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const count = await Movie.countDocuments(query);
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getMoviesById = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404);
      throw new Error('Movie not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ rate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/// PRIVATE CONTROLLER
const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReview = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      if (alreadyReview) {
        res.status(400);
        throw new Error('You already review this movie');
      }
      // else create a new movie
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      movie.reviews.push(review);
      movie.numberOfRevies = movie.reviews.length;
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({
        message: 'Review addded',
      });
    } else {
      res.status(404);
      throw new Error('Movie not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN CONTROLLER
try {
} catch (error) { }
const updateMovie = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      time,
      language,
      category,
      year,
      video,
      casts,
    } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      (movie.name = name || movie.name),
        (movie.desc = desc || movie.desc),
        (movie.image = image || movie.image),
        (movie.titleImage = titleImage || movie.titleImage),
        (movie.time = time || movie.time),
        (movie.language = language || movie.language),
        (movie.category = category || movie.category),
        (movie.year = year || movie.year),
        (movie.video = video || movie.video),
        (movie.casts = casts || movie.casts);
      const updatedMovie = await movie.save();
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error('Movie not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.remove();
      res.json({ message: 'Movie removed successfully' });
    } else {
      res.status(404);
      throw new Error('Movie not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
const deleteAllMovie = asyncHandler(async (req, res) => {
  try {
    await Movie.deleteMany({});
    res.json({ message: 'Movie deleted all successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const createMovie = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      time,
      language,
      category,
      year,
      video,
      casts,
    } = req.body;
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      time,
      language,
      category,
      year,
      video,
      casts,
      userId: req.user._id,
    });
    if (movie) {
      const createMovie = await movie.save();
      res.status(200).json(createMovie);
    } else {
      res.status(404);
      throw new Error('Create movie failed');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export {
  importMovies,
  getMovies,
  getMoviesById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovie,
  createMovie,
  searchMovies,
};
