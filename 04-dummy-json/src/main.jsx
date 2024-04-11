import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./component/Test.jsx";
import Detail from "./pages/Detail.jsx";
import Category from "./pages/Category.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/category/:catname" element={<Category />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
