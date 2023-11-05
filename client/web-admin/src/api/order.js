import ApiRequest from "../service/axios.js";
import { orderSliceActions } from "../slice/orderSlice";

export const getAllOrder = async (token, dispatch, page = 0, size = 0) => {
  dispatch(orderSliceActions.getOrderStart());
  try {
    const res = await ApiRequest.get(
      `/order/all-order?page=${page}&size=${size}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    dispatch(orderSliceActions.getOrderSuccess(res));
  } catch (error) {
    console.log("[CART_GET_ERROR] " + error.message);
    dispatch(orderSliceActions.getOrderError(error));
  }
};

export const loadMoreOrder = async (token, dispatch, page = 0, size = 0) => {
  dispatch(orderSliceActions.getOrderStart());
  dispatch(orderSliceActions.updatePage(1));
  try {
    const res = await ApiRequest.get(
      `/order/all-order?page=${page}&size=${size}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    dispatch(orderSliceActions.getOrderSuccess(res));
  } catch (error) {
    console.log("[CART_GET_ERROR] " + error.message);
    dispatch(orderSliceActions.getOrderError(error));
  }
};
