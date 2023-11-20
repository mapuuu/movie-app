import React, { useEffect, useState } from 'react';
import Uploader from '../../../Components/Home/Uploader';
import { Input, Message, Select } from '../../../Components/Home/UsedInput';
import { DataCategories } from '../../../Data/DataCategories';
import { UsersData } from '../../../Data/UsersData';
import SlideBar from '../SlideBar';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import CastsModal from '../../../Components/Home/Modals/CastsModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieValidation } from '../../../Components/Validation/MovieValidation';
import {
  createMovieAction,
  removeCastAction,
} from '../../../Redux/Actions/MoviesActions';
import { toast } from 'react-hot-toast';
import { InlineError } from '../../../Components/Notfications/Error';
import { ImagePreview } from '../../../Components/Home/ImagePrevious';

const AddMovies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);

  const [imageWithoutTitle, setImageWithoutTitle] = useState('');
  const [imageWithTitle, setImageWithTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovies
  );
  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });
  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageWithTitle,
        video: videoUrl,
        casts,
      })
    );
  };

  // delete cast handler
  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success('Cast deleted successfully');
  };

  // useEffect

  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
    if (isSuccess) {
      reset({
        name: '',
        time: 0,
        language: '',
        year: 0,
        category: '',
        desc: '',
      });
      setImageWithTitle('');
      setImageWithoutTitle('');
      setVideoUrl('');
      dispatch({ type: 'CREATE_MOVIE_RESET' });
      navigate('/addMovie');
    }
    //
    if (isError) {
      toast.error('Something went wrong');
      dispatch({ type: 'CREATE_MOVIE_RESET' });
    }
  }, [modalOpen, dispatch, isError, isSuccess, reset, navigate]);
  return (
    <SlideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Create Movie</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Movie Title"
              placeholder="Name of the movie"
              type="text"
              name="name"
              register={register('name')}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Hours"
              placeholder="2hr"
              type="number"
              name="time"
              register={register('time')}
              bg={true}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Language"
              placeholder="English"
              type="text"
              bg={true}
              name="language"
              register={register('language')}
            />

            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div>
            <Input
              label="Year of relsease"
              placeholder="2022"
              type="number"
              bg={true}
              name="year"
              register={register('year')}
            />

            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* images */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 ">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploader setImageUrl={setImageWithoutTitle} />
            <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>
          {/* Images with title  */}
          <div className="flex flex-col gap-2 ">
            <p className="text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploader setImageUrl={setImageWithTitle} />
            <ImagePreview image={imageWithTitle} name="imageWithTitle" />
          </div>
        </div>
        {/* Description */}
        <div className="w-full">
          <Message
            label="Description"
            placeholder="Make it short and sweet"
            name="desc"
            register={{ ...register('desc') }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>
        {/* Category */}
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register('category') }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>
        {/* Movie Video */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <div className={`w-full grid ${videoUrl && 'md-grid-cols-2'} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video Uploaded
              </div>
            )}

            <Uploader setImageUrl={setVideoUrl} />
          </div>
        </div>
        {/* Cast */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {casts?.length > 0 &&
              casts?.map((user) => (
                <div
                  key={user.id}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={`${user?.image ? user.image : '/images/user.png'}`}
                    alt={user.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{user.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2 ">
                    <button
                      onClick={() => deleteCastHandler(user?.id)}
                      className="w-6 h-6 bg-dry border border-border text-subMain rounded flex-colo"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(user);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 bg-dry border border-border text-green rounded flex-colo"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6 font-medium  rounded py-4   text-white"
        >
          {isLoading ? (
            'Please wait...'
          ) : (
            <>
              <ImUpload /> Publish Movie
            </>
          )}
        </button>
      </div>
    </SlideBar>
  );
};

export default AddMovies;
