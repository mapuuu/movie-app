import React from 'react';
import Layout from '../Layout/Layout';
import Head from '../Components/Home/Head';
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';
const ContactUs = () => {
  const ContactData = [
    {
      id: 1,
      title: 'Email Us',
      info: 'Contact for me when you have questions',
      icon: FiMail,
      contact: 'info@example.com',
    },
    {
      id: 2,
      title: 'Call Us',
      info: 'Call e if you have questions',
      icon: FiPhoneCall,
      contact: '0333851245',
    },
    {
      id: 1,
      title: 'Location',
      info: 'Company headquarters in here',
      icon: FiMapPin,
      contact: 'Hoang Luong, Hiep Hoa, Bac Giang',
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid mg:grid-cols-2 gap-6 lg:mt-20 mt-10 lg:grid-cols-3 xl:gap-8 ">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center "
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl ">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2 ">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7 ">
                <a href={`mailo:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>{' '}
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
