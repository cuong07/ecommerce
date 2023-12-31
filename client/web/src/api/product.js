import ApiRequest from "../service/axios";
import { productSliceAction } from "../slice/productSlice";

export const getListProducts = async (token, dispatch, page = 0, size = 0) => {
  dispatch(productSliceAction.getProductStart());
  try {
    const res = await ApiRequest.get(`/product?page=${page}&size=${size}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(productSliceAction.getProductSuccess(res));
  } catch (error) {
    dispatch(productSliceAction.getProductError());
  }
};

export const loadMoreProduct = async (token, dispatch, page = 0, size = 0) => {
  dispatch(productSliceAction.getProductStart());
  dispatch(productSliceAction.updatePage(1))
  try {
    const res = await ApiRequest.get(`/product?page=${page}&size=${size}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(productSliceAction.getProductSuccess(res));
  } catch (error) {
    dispatch(productSliceAction.getProductError());
  }
};
