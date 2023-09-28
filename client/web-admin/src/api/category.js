import ApiRequest from '../service/axios';
import { categorySliceActions } from '../slice/categorySlice';

export const getCategory = async (dispatch) => {
  dispatch(categorySliceActions.getCategoryStart());
  try {
    const res = await ApiRequest.get('/category');
    dispatch(categorySliceActions.getCategorySuccess(res));
  } catch (error) {
    dispatch(categorySliceActions.getCategoryError());
  }
};
