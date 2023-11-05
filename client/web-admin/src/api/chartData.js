import ApiRequest from "../service/axios";
import { chartSliceAction } from "../slice/chartSlice";

export const getLineChart = async (token, dispatch) => {
  dispatch(chartSliceAction.fetchingStart());
  try {
    const res = await ApiRequest.get("/dataset", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch(chartSliceAction.getLineChartSuccess(res));
  } catch (error) {
    dispatch(chartSliceAction.fetchingError(error));
  }
};

export const getPieChartCategory = async (token, dispatch) => {
  dispatch(chartSliceAction.fetchingStart());
  try {
    const res = await ApiRequest.get("/dataset/category", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    dispatch(chartSliceAction.getPieChartSuccess(res));
  } catch (error) {
    dispatch(chartSliceAction.fetchingError(error));
  }
};

export const getSoldMostProduct = async (
  token,
  dispatch,
  page = 0,
  size = 0
) => {
  dispatch(chartSliceAction.fetchingStart());
  try {
    const res = await ApiRequest.get(
      `/dataset/sold-most-product?page=${page}&size=${size}`,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    dispatch(chartSliceAction.getSoldMostProductSuccess(res));
  } catch (error) {
    dispatch(chartSliceAction.fetchingError(error));
  }
};

export const loadMoreSoldMostProduct = async (
  token,
  dispatch,
  page = 0,
  size = 0
) => {
  dispatch(chartSliceAction.getProductStart());
  dispatch(chartSliceAction.updatePageSoldMostProduct(1));
  try {
    const res = await ApiRequest.get(`/product?page=${page}&size=${size}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(chartSliceAction.getSoldMostProductSuccess(res));
  } catch (error) {
    dispatch(chartSliceAction.fetchingError(error));
  }
};

export const getBiggestBuyer = async (token, dispatch, page = 0, size = 0) => {
  dispatch(chartSliceAction.fetchingStart());
  try {
    const res = await ApiRequest.get(
      `/dataset/biggest-buyer?page=${page}&size=${size}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(chartSliceAction.getBiggestBuyerSuccsess(res));
  } catch (error) {
    dispatch(chartSliceAction.fetchingError(error));
  }
};
