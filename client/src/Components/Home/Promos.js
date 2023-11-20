import React from 'react';
import { FiUser } from 'react-icons/fi';
const Promos = () => {
  return (
    <div className="my-20 py-10 md:px px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-x1 capitalize font-sans font-medium xl:leading-relaxed">
            Download Your Movies & Watch your favorites film
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
          <div className="flex gap-4 md:text-lg text-sm ">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold">
              HD 4K
            </div>
            <div className="flex-rows bg-black text-subMain px-6 py-3 rounded-md font-bold">
              <FiUser /> 10K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promos;
