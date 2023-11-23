import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../Context/Functionalities';
import Rating from './Home/Stars';

const Movie = ({ movie }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = IfMovieLiked(movie);

  useEffect(() => {
    // Scroll to the top when the component mounts or when the URL changes
    window.scrollTo(0, 0);
  }, [window.location.pathname]); // Run the effect when the URL changes

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : '/images/user.png'}
            alt={movie?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-0 bg-main bg-opacity-60 text-white px-2 py-1 m-2 rounded-md">
          <p className="font-bold text-sm flex">
            <FaStar className='text-star' />{movie?.rate}
          </p>
        </div>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-while px-4 py-3 mb-7">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => LikeMovie(movie, dispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions 
          ${isLiked ? 'bg-transparent ' : 'bg-subMain'}
          hover:bg-transparent border-2 border-subMain rounded-md text-white`}
          >
            <FaHeart />
          </button>
        </div>
        <div className="col-span-3 flex-rows border-l border-border text-sm gap-1 pt-1 text-star ">
          <p>Total review: {movie?.numberOfRevies}</p>
        </div>
      </div>
    </>
  );
};

export default Movie;
