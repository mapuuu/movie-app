import * as CategoriesContants from '../Constants/CategoriesContants';
import * as categoriesAPIs from '../Apis/CategoriesService';

import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../Protection.js';

//get all Catefories action
export const getAllCategoriesAction = () => async (dispath) => {
  try {
    dispath({ type: CategoriesContants.GET_ALL_CATEGORIES_REQUEST });
    const data = await categoriesAPIs.getCategoriesService();
    dispath({
      type: CategoriesContants.GET_ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispath, CategoriesContants.GET_ALL_CATEGORIES_FAIL);
  }
};

export const createCategoryAction = (title) => async (dispath, getState) => {
  try {
    dispath({ type: CategoriesContants.CREATE_CATEGORY_REQUEST });
    await categoriesAPIs.createCategoryService(
      title,
      tokenProtection(getState)
    );
    dispath({ type: CategoriesContants.CREATE_CATEGORY_SUCCESS });
    toast.success('Category created successfully');
  } catch (error) {
    ErrorsAction(error, dispath, CategoriesContants.CREATE_CATEGORY_FAIL);
  }
};

// update Categories Action
export const updateCategoryAction =
  (id, title) => async (dispath, getState) => {
    try {
      dispath({ type: CategoriesContants.UPDATE_CATEGORY_REQUEST });
      await categoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispath({ type: CategoriesContants.UPDATE_CATEGORY_SUCCESS });
      toast.success('Category updateed successfully');
      dispath(getAllCategoriesAction());
    } catch (error) {
      ErrorsAction(error, dispath, CategoriesContants.UPDATE_CATEGORY_FAIL);
    }
  };

// delete categories
export const deleteCategoryAction = (id) => async (dispath, getState) => {
  try {
    dispath({ type: CategoriesContants.DELETE_CATEGORY_REQUEST });
    await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispath({ type: CategoriesContants.DELETE_CATEGORY_SUCCESS });
    toast.success('Category deleted successfully');
    dispath(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispath, CategoriesContants.DELETE_CATEGORY_FAIL);
  }
};
