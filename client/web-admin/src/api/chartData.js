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
