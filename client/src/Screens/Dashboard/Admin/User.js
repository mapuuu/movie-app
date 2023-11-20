import React, { useEffect } from 'react';
import Table from '../../../Components/Home/Table';
import { DataCategories } from '../../../Data/DataCategories';
import SlideBar from '../SlideBar';
import { HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../Components/Home/Table2';
import { UsersData } from '../../../Data/UsersData';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAction,
  getAllUsersAction,
} from '../../../Redux/Actions/userActions';
import { toast } from 'react-hot-toast';
import Loader from '../../../Components/Notfications/Loader';
import { Empty } from '../../../Components/Notfications/Empty';
const User = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );
  //delete
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );
  // delete user handler
  const deleteMovieHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user')) {
      dispatch(deleteUserAction(id));
    }
  };
  // useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? 'GET_ALL_USERS_RESET' : 'DELETE_USER_RESET',
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SlideBar>
      <div className="flex flex-col gap-6">
        <h2 className="flex-btn gap-2">UsersData </h2>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFuntion={deleteMovieHandler}
          />
        ) : (
          <Empty message="Not found user" />
        )}
      </div>
    </SlideBar>
  );
};

export default User;
