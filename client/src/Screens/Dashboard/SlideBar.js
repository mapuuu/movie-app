import React from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaHeart, FaListAlt, FaUsers } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import {
  RiMovie2Fill,
  RiLockPasswordLine,
  RiLogoutCircleFill,
  RiLogoutCircleLine,
} from 'react-icons/ri';
import { HiViewGridAdd } from 'react-icons/hi';
import Layout from '../../Layout/Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
const SlideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  //logout funtion
  const logOutHandler = () => {
    dispatch(logoutAction());
    navigate('/login');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const SlideLinks = userInfo?.isAdmin
    ? [
        {
          name: 'DashBoard',
          link: '/dashboard',
          icon: BsFillGridFill,
        },
        {
          name: 'Movies List',
          link: '/movieslist',
          icon: FaListAlt,
        },
        {
          name: 'Add Movie',
          link: '/addmovie',
          icon: RiMovie2Fill,
        },
        {
          name: 'Categories',
          link: '/categories',
          icon: HiViewGridAdd,
        },
        {
          name: 'Users',
          link: '/users',
          icon: FaUsers,
        },
        {
          name: 'Update Profile',
          link: '/profile',
          icon: FiSettings,
        },
        {
          name: 'Favorites Movies',
          link: '/favorites',
          icon: FaHeart,
        },
        {
          name: 'Change Password',
          link: '/password',
          icon: RiLockPasswordLine,
        },
      ]
    : userInfo
    ? [
        {
          name: 'Update Profile',
          link: '/profile',
          icon: FiSettings,
        },
        {
          name: 'Favorites Movies',
          link: '/favorites',
          icon: FaHeart,
        },
        {
          name: 'Change Password',
          link: '/password',
          icon: RiLockPasswordLine,
        },
      ]
    : [];

  const active = 'bg-dryGreen text-subMain ';
  const hover = 'hover:text-white hover:bg-main';
  const inActive =
    'rounded font-medium text-sm transitions flex gap-3 items-center p-4 ';
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive} ` : `${inActive} ${hover}`;
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {SlideLinks.map((link, index) => (
              <NavLink to={link.link} key={index} className={Hover}>
                <link.icon /> <p>{link.name}</p>
              </NavLink>
            ))}
            <button
              onClick={logOutHandler}
              className={`${inActive} ${hover} w-full`}
            >
              <RiLogoutCircleLine /> <p>Log Out</p>
            </button>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="100"
            className="col-span-6 rounded-md p-6 bg-dry- border border-gray-800"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SlideBar;
