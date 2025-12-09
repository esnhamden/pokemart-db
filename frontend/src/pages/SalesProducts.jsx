import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const salesProductsSchema = [
  {
    label: "Sale Product ID",
    name: "sale_product_id",
    id: "sale_product_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Sale ID",
    name: "sale_id",
    id: "sale_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Product ID",
    name: "product_id",
    id: "product_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Quantity",
    name: "quantity",
    id: "quantity",
    type: "text",
  },
];

const SalesProducts = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/salesproducts`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      salesProductsSchema.forEach((field) => {
        if (field.type === "select" || field.type === "select_id") {
          for (const row of rows) {
            if (!field.options.includes(row[field.name])) {
              field.options.push(row[field.name]);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Sales Products</h1>
      <Table schema={salesProductsSchema} rows={rows} />
      <h2>Add sale product to a store</h2>
      <CreateForm
        schema={salesProductsSchema.slice(1)}
        initialData={{
          sale_id: "",
          product_id: "",
          quantity: "",
        }}
        getData={getData}
        endpoint={endpoint}
      />
      <h2>Update sale product information</h2>
      <UpdateForm
        schema={salesProductsSchema}
        initialData={{
          sale_product_id: "",
          sale_id: "",
          product_id: "",
          quantity: "",
        }}
        rows={rows}
        getData={getData}
        endpoint={endpoint}
      />
    </div>
  );
};
export default SalesProducts;
