import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        className="w-full h-96 object-contain"
        src="/images/notFound.jpg"
        alt="Not Found"
      />
      <h1 className="lg:text-4xl font-bold">Page Not Found</h1>
      <p className="font-semibold leading-6 italic ">
        The page you are looking for does not exist. You may have mistyped the
        URL
      </p>
      <Link
        to="/"
        className=" bg-subMain text-white font-medium py-2 px-4 rounded-md"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
