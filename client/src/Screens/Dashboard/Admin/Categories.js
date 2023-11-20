import React, { useEffect, useState } from 'react';
import Table from '../../../Components/Home/Table';
import { DataCategories } from '../../../Data/DataCategories';
import SlideBar from '../SlideBar';
import { HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../Components/Home/Table2';
import CategoryModal from '../../../Components/Home/Modals/CategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from '../../../Redux/Actions/categoryAction';
import Loader from '../../../Components/Notfications/Loader';
import { Empty } from '../../../Components/Notfications/Empty';
import { toast } from 'react-hot-toast';
const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  // all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );

  // delete category
  const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeletecategory = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const OnEditFuntion = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    // get all categories
    dispatch(getAllCategoriesAction());
    if (isError) {
      toast.error(isError);
      dispatch({
        type: 'DELETE_CATEGORY_RESET',
      });
    }
    if (isSuccess) {
      dispatch({ type: 'DELETE_CATEGORY_RESET' });
    }

    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);

  return (
    <SlideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold ">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-2 rounded "
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFuntion={OnEditFuntion}
            onDeleteFuntion={adminDeletecategory}
          />
        ) : (
          <Empty message="Not found categories" />
        )}
      </div>
    </SlideBar>
  );
};

export default Categories;
