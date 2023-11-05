import { Routes, Route } from "react-router-dom";
import "./App.css";
import route from "./constants/route";
import {
  Login,
  Public,
  Signup,
  Home,
  Product,
  EditProduct,
  NotFound,
  CreateProduct,
  Category,
  CreateCategory,
  EditCategory,
  Cart,
  Order,
} from "./page/public";

function App() {
  return (
    <Routes>
      <Route path={route.PUBLIC} element={<Public />}>
        <Route index path={route.DASHBOARD} element={<Home />} />
        <Route path={route.LOGIN} element={<Login />} />
        <Route path={route.SIGNUP} element={<Signup />} />
        <Route path={route.PRODUCT} element={<Product />} />
        <Route path={route.PRODUCT_CREATE} element={<CreateProduct />} />
        <Route path={route.CATEGORY} element={<Category />} />
        <Route path={route.CATEGORY_CREATE} element={<CreateCategory />} />
        <Route path={route.CATEGORY_EDIT} element={<EditCategory />} />
        <Route path={route.NOTFOUND} element={<NotFound />} />
        <Route path={route.PRODUCT_EDIT} element={<EditProduct />} />
        <Route path={route.CART} element={<Cart />} />
        <Route path={route.ORDER} element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
