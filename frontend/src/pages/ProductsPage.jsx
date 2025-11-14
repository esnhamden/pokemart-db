import { useState, useEffect } from "react";

import Table from "../components/Table.jsx";
import InsertForm from "../components/InsertForm.jsx";
import UpdateForm from "../components/UpdateForm.jsx";

const ProductsPage = () => {
  const [rows, setRows] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const getData = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/products"
    );
    const rows = await response.json();
    setRows(rows);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Table
        rows={rows}
        showUpdateForm={showUpdateForm}
        setShowUpdateForm={setShowUpdateForm}
      />
      <InsertForm rows={rows} />
      {showUpdateForm && <UpdateForm rows={rows} />}
    </div>
  );
};

export default ProductsPage;
