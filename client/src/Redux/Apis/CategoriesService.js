import Axios from './Axios';

// get all catgories
const getCategoriesService = async () => {
  const { data } = await Axios.get('/categories');
  return data;
};

// create new category API funtion

const createCategoryService = async (title, token) => {
  const { data } = await Axios.post('/categories', title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete category API funtion
const deleteCategoryService = async (id, token) => {
  const { data } = await Axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateCategoryService = async (id, title, token) => {
  const { data } = await Axios.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  createCategoryService,
};
