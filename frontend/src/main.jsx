import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Stores from "./pages/Stores";
import DiscountCodes from "./pages/DiscountCodes";
import Sales from "./pages/Sales";
import SalesProducts from "./pages/SalesProducts";
import StoresProducts from "./pages/StoresProducts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/discountcodes" element={<DiscountCodes />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/salesproducts" element={<SalesProducts />} />
        <Route path="/storesproducts" element={<StoresProducts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
