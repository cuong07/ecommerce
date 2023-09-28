import ApiRequest from '../service/axios';
import discountSlice, { discountSliceActions } from '../slice/discountSlice';

export const getDiscount = async (dispatch) => {
  dispatch(discountSliceActions.getDiscountStart());
  try {
    const res = await ApiRequest.get('/discount');
    dispatch(discountSliceActions.getDiscountSuccess(res));
  } catch (error) {
    dispatch(discountSliceActions.getDiscountError());
  }
};
