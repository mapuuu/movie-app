import React, { useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Components/Home/UsedInput';
import Layout from '../Layout/Layout';
import { InlineError } from '../Components/Notfications/Error';
import { toast } from 'react-hot-toast';
import { registerAction } from '../Redux/Actions/userActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../Components/Validation/UserValidation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );
  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };
  // useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate('/dashboard');
    } else if (userInfo) {
      navigate('/profile');
    }
    if (isSuccess) {
      toast.success(`Welcome ${userInfo?.fullName}`);
      dispatch({ type: 'USER_REGISTER_RESET' });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: 'USER_REGISTER_RESET' });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full gap-8 2xl:w-2/5 flex-colo p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logophim.jpg"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <div className="w-full">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              name="fullName"
              register={register('fullName')}
            />
            {errors.fullName && <InlineError text={errors.fullName.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Email"
              placeholder="Enter your email address"
              type="email"
              name="email"
              register={register('email')}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Password"
              placeholder="*******"
              type="password"
              name="password"
              register={register('password')}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            to="/dashboard"
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                <FiLogIn />
                Sign Up
              </>
            )}
          </button>
          <p className="text-center text-border">
            Already have an account ? {''}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
