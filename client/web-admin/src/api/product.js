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
  dispatch(productSliceAction.updatePage(1));
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

export const getProductById = async (token, dispatch, id) => {
  dispatch(productSliceAction.getProductStart());
  try {
    const res = await ApiRequest.get(`/product/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(productSliceAction.getProductDetail(res));
  } catch (error) {
    dispatch(productSliceAction.getProductError());
  }
};

export const updateProduct = async (token, dispatch, product) => {
  dispatch(productSliceAction.getProductStart());
  try {
    await ApiRequest.put("/product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    });
    const res = await ApiRequest.get(`/product/${product.productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(productSliceAction.updateProductSuccess());
    dispatch(productSliceAction.getProductDetail(res));
  } catch (error) {
    dispatch(productSliceAction.getProductError());
  }
};

export const updateImageProduct = async (token, dispatch, data) => {
  dispatch(productSliceAction.getProductStart());
  try {
    await ApiRequest.put("/product/update-image", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const res = await ApiRequest.get(`/product/${data.productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(productSliceAction.updateProductSuccess());
    dispatch(productSliceAction.getProductDetail(res));
  } catch (error) {
    dispatch(productSliceAction.getProductError());
  }
};
