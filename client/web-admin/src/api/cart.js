import { authSliceActions } from "../slice/authSlice";
import ApiRequest from "../service/axios.js";
import { cartSliceActions } from "../slice/cartSlice";

export const getAllCart = async (token, dispatch, page = 0, size = 0) => {
  dispatch(cartSliceActions.getCartStart());
  try {
    const res = await ApiRequest.get(
      `/cart/all-cart?page=${page}&size=${size}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    dispatch(cartSliceActions.getCartSuccess(res));
  } catch (error) {
    console.log("[CART_GET_ERROR] " + error.message);
    dispatch(cartSliceActions.getDiscountError(error));
  }
};
