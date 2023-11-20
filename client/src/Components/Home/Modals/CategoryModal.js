import React, { useEffect, useState } from 'react';
import { Input } from '../UsedInput';
import MainModal from './MainModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategoryAction,
  updateCategoryAction,
} from '../../../Redux/Actions/categoryAction';
import { toast } from 'react-hot-toast';

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSucess,
  } = useSelector((state) => state.categoryUpdate);
  // create category handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      if (category) {
        dispatch(updateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createCategoryAction({ title: title }));
        setTitle('');
      }
    } else {
      toast.error('please select a category');
    }
  };
  // useEffect
  useEffect(() => {
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type: isError ? 'CREATE_CATEGORY_RESET' : 'UPDATE_CATEGORY_RESET',
      });
    }
    if (isSuccess || upSucess) {
      dispatch({
        type: isError ? 'CREATE_CATEGORY_RESET' : 'UPDATE_CATEGORY_RESET',
      });
    }

    //  if category is not null
    if (category) {
      setTitle(category?.title);
    }
    if (modalOpen === false) {
      setTitle('');
    }
  }, [dispatch, isError, isSuccess, upSucess, upError, category, modalOpen]);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full  align-middle p-10 overflow-y-auto h-full text-white rounded-2xl ">
        <h2 className="text-3xl font-bold ">
          {category ? 'Update' : 'Create'}
        </h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onClick={submitHandler}
        >
          <Input
            label="Category Name"
            placeholder={' Actions'}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 font-bold hover:bg-dry transitions rounded bg-subMain text-white"
          >
            {isLoading || upLoading
              ? 'Loading...'
              : category
              ? 'Update'
              : 'Create'}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
