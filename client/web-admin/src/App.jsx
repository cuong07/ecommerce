import "./App.css";
import { Routes, Route } from "react-router-dom";
import route from "./constants/route";
import {
  Login,
  Public,
  Signup,
  Home,
  Product,
  EditProduct,
  NotFound,
} from "./page/public";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={route.PUBLIC} element={<Public />}>
          <Route index element={<Home />} />
          <Route path={route.LOGIN} element={<Login />} />
          <Route path={route.SIGNUP} element={<Signup />} />
          <Route path={route.PRODUCT} element={<Product />} />
          <Route path={route.PRODUCT_DETAIL} element={<EditProduct />} />
          <Route path={route.NOTFOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
