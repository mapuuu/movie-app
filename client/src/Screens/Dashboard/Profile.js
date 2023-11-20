import React, { useEffect, useState } from 'react';
import Uploader from '../../Components/Home/Uploader';
import { Input } from '../../Components/Home/UsedInput';
import SlideBar from './SlideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notfications/Error';
import { ImagePreview } from '../../Components/Home/ImagePrevious';
import {
  deleteProfileAction,
  updateProfileAction,
} from '../../Redux/Actions/userActions';
import { toast } from 'react-hot-toast';
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : '');
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });
  //update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };
  // delete profile
  const deleteProfile = () => {
    window.confirm('Are you sure you want to delete this profile');
    dispatch(deleteProfileAction());
  };
  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue('fullName', userInfo?.fullName);
      setValue('email', userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
      dispatch({ type: 'USER_DELETE_PROFILE_RESET' });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: 'USER_DELETE_PROFILE_RESET' });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SlideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          {/* images preview */}
          <div className="col-span-2">
            <ImagePreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : 'NetFlix'}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Enter your full name"
            type="text"
            name="fullName"
            register={register('fullName')}
            bg={true}
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
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? 'Deleting...' : 'Delete Acount......'}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            className="bg-main  font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </SlideBar>
  );
};

export default Profile;
