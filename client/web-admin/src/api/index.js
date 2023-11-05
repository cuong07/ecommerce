export {
  getProductById,
  getListProducts,
  loadMoreProduct,
  updateProduct,
  updateImageProduct,
  createProduct,
} from "./product";
export { login } from "./auth";
export {
  getCategory,
  createCategory,
  updateCategory,
  getCategoryById,
} from "./category";
export { getDiscount } from "./discount";

export {
  getLineChart,
  getPieChartCategory,
  getSoldMostProduct,
  getBiggestBuyer,
} from "./chartData";

export { getAllCart } from "./cart";
export { getAllOrder, loadMoreOrder } from "./order";
