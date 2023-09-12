import "./App.css";
import { Routes, Route } from "react-router-dom";
import route from "./constants/route";
import { Login, Public, Signup, Home, Product } from "./page/public";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={route.PUBLIC} element={<Public />}>
          <Route path={route.LOGIN} element={<Login />} />
          <Route path={route.SIGNUP} element={<Signup />} />
          <Route path={route.HOME} element={<Home />} />
          <Route path={route.PRODUCT} element={<Product />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
