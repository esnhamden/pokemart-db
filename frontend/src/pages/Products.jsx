import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const productsSchema = [
  {
    label: "Product ID",
    name: "product_id",
    id: "product_id",
    type: "select_id",
    options: [],
  },
  { label: "Product Name", name: "name", id: "name", type: "text" },
  { label: "Price", name: "price", id: "price", type: "text" },
];

const Products = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/products`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      productsSchema.forEach((field) => {
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
      <h1>Products</h1>
      <Table schema={productsSchema} rows={rows} />
      <h2>Add a new product</h2>
      <CreateForm
        schema={productsSchema.slice(1)}
        initialData={{
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          registration_date: "",
        }}
        getData={getData}
        endpoint={endpoint}
      />
      <h2>Update product information</h2>
      <UpdateForm
        schema={productsSchema}
        initialData={{
          customer_id: "",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          registration_date: "",
        }}
        rows={rows}
        getData={getData}
        endpoint={endpoint}
      />
    </div>
  );
};
export default Products;
