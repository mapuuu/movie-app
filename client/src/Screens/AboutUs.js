import React from 'react';
import Head from '../Components/Home/Head';
import Layout from './../Layout/Layout';
const AboutUs = () => {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to my app
              </h3>

              <div className="mt-3 text-sm leading-8 text-text">
                <p>Lorem Ipsum is Lorem Ipsum but I don't like it unless</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold mt-4">
                    10K
                  </span>
                  <h4 className="text-lg font-semibold my-2 ">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Lorem Ipsum is Lorem Ipsum, Lorem Ipsum and Lorem Ipsum
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold mt-4">
                    10K
                  </span>
                  <h4 className="text-lg font-semibold my-2 ">Lovely User</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Lorem Ipsum is Lorem Ipsum, Lorem Ipsum and Lorem Ipsum
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="/images/movies/aboutus.jpg"
                alt="aboutus"
                className="w-full xl:block hidden h-header rounded-lg object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
