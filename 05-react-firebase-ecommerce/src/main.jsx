import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Test from "./component/Test.jsx";
import Detail from "./pages/Detail.jsx";
import Category from "./pages/Category.jsx";

// Dashboard
import Login from "./dashboard/Login.jsx";
import Signup from "./dashboard/Signup.jsx";
import AddCategory from "./dashboard/AddCategory.jsx";
import AddProduct from "./dashboard/AddProduct.jsx";
import AllProduct from "./dashboard/AllProduct.jsx";
import Logout from "./dashboard/Logout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/category/:catid" element={<Category />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Login />} />
      <Route path="/dashboard/signup" element={<Signup />} />
      <Route path="/dashboard/category" element={<AddCategory />} />
      <Route path="/dashboard/product" element={<AddProduct />} />
      <Route path="/dashboard/allproduct" element={<AllProduct />} />
      <Route path="/dashboard/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
