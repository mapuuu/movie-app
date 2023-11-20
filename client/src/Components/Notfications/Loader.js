import { PuffLoader } from 'react-spinners';

import React from 'react';

const Loader = () => {
  return (
    <div className="w-full py-4 px-2 flex-colo">
      <PuffLoader color="#F2000" />
    </div>
  );
};

export default Loader;
