import React, { useEffect, useState } from 'react';
import { Input } from '../UsedInput';
import MainModal from './MainModal';
import * as yup from 'yup';
import Uploader from '../Uploader';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieValidation } from '../../Validation/MovieValidation';
import {
  addCastAction,
  createMovieAction,
  updateCastAction,
} from '../../../Redux/Actions/MoviesActions';
import { toast } from 'react-hot-toast';
import { InlineError } from '../../Notfications/Error';
import { ImagePreview } from '../ImagePrevious';

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState('');
  const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('Cast Name is required'),
      })
    ),
  });
  const onSubmit = (data) => {
    if (cast) {
      dispatch(
        updateCastAction({
          ...data,
          image: image,
          id: cast.id,
        })
      );
      toast.success('Cast updated successfully');
    } else {
      dispatch(
        addCastAction({
          ...data,
          image: image,
          id: generateId,
        })
      );
      toast.success('Movie updated successfully');
    }
    reset();
    setCastImage('');
    setModalOpen(false);
  };
  useEffect(() => {
    if (cast) {
      setValue('name', cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full  align-middle p-10 overflow-y-auto h-full text-white rounded-2xl ">
        <h2 className="text-3xl font-bold ">
          {cast ? 'Update Cast' : 'Create Cast'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="Cast Name"
              placeholder="Enter cast name"
              type="text"
              name="name"
              register={register('name')}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="text-border font-semibold text-sm">Cast Image</p>
            <Uploader setImageUrl={setCastImage} />
            <ImagePreview
              image={image ? image : '/images/user.png'}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 font-bold hover:bg-dry transitions rounded bg-subMain text-white"
          >
            {cast ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
