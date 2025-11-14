import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import StoresPage from "./pages/StoresPage";
import DiscountCodesPage from "./pages/DiscountCodesPage";
import SalesPage from "./pages/SalesPage";
import SalesProductsPage from "./pages/SalesProductsPage";
import StoresProductsPage from "./pages/StoresProductsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/discountcodes" element={<DiscountCodesPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/salesproducts" element={<SalesProductsPage />} />
        <Route path="/storesproducts" element={<StoresProductsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
