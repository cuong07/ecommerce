import ApiRequest from "../service/axios";
import { categorySliceActions } from "../slice/categorySlice";

export const getCategory = async (dispatch) => {
  dispatch(categorySliceActions.fetchingStart());
  try {
    const res = await ApiRequest.get("/category");
    dispatch(categorySliceActions.getCategorySuccess(res));
  } catch (error) {
    dispatch(categorySliceActions.fetchingError());
  }
};

export const createCategory = async (token, dispatch, data) => {
  dispatch(categorySliceActions.fetchingStart());
  try {
    await ApiRequest.post("/category", data, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch(categorySliceActions.createCategorySuccess());
  } catch (error) {
    dispatch(categorySliceActions.fetchingError());
  }
};
